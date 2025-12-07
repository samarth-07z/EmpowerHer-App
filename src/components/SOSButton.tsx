import { AlertTriangle, Users, MapPin } from 'lucide-react';
import { useState, useEffect } from 'react';
import EmergencyContacts from './EmergencyContacts';

interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  relationship: string;
}

const SOSButton = () => {
  const [isPressed, setIsPressed] = useState(false);
  const [showContacts, setShowContacts] = useState(false);
  const [contacts, setContacts] = useState<EmergencyContact[]>([]);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [callingTimer, setCallingTimer] = useState(0);
  const [isCallingContacts, setIsCallingContacts] = useState(false);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Encryption-backed persistent storage
  // We store only encrypted ciphertext in `localStorage` and the session key in `sessionStorage`.
  // This keeps plaintext phone numbers out of persistent browser storage while still allowing
  // the data to survive page reloads (session key lives in sessionStorage which persists across
  // reloads but is cleared when the tab is closed).

  const STORAGE_KEY = 'emergencyContacts_encrypted';
  const KEY_STORAGE = 'emergencyContacts_key_b64';

  const arrayBufferToBase64 = (buffer: ArrayBuffer) => {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    const chunkSize = 0x8000;
    for (let i = 0; i < bytes.length; i += chunkSize) {
      const chunk = bytes.subarray(i, i + chunkSize);
      binary += String.fromCharCode.apply(null, Array.from(chunk));
    }
    return btoa(binary);
  };

  const base64ToArrayBuffer = (b64: string) => {
    const binary = atob(b64);
    const len = binary.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes.buffer;
  };

  const generateAndStoreKey = async (): Promise<CryptoKey> => {
    const key = await crypto.subtle.generateKey({ name: 'AES-GCM', length: 256 }, true, ['encrypt', 'decrypt']);
    const raw = await crypto.subtle.exportKey('raw', key);
    const b64 = arrayBufferToBase64(raw);
    try {
      sessionStorage.setItem(KEY_STORAGE, b64);
    } catch (e) {
      console.warn('Unable to persist session key to sessionStorage:', e);
    }
    return key;
  };

  const importKeyFromStorage = async (): Promise<CryptoKey | null> => {
    const b64 = sessionStorage.getItem(KEY_STORAGE);
    if (!b64) return null;
    try {
      const raw = base64ToArrayBuffer(b64);
      return await crypto.subtle.importKey('raw', raw, 'AES-GCM', true, ['encrypt', 'decrypt']);
    } catch (e) {
      console.warn('Failed to import key from sessionStorage:', e);
      return null;
    }
  };

  const getKey = async (): Promise<CryptoKey> => {
    const existing = await importKeyFromStorage();
    if (existing) return existing;
    return await generateAndStoreKey();
  };

  const encryptData = async (obj: any): Promise<string> => {
    if (!window.crypto || !crypto.subtle) {
      // Fallback - if crypto not available, store plaintext (least desirable)
      return JSON.stringify(obj);
    }
    const key = await getKey();
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encoded = new TextEncoder().encode(JSON.stringify(obj));
    const cipher = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, encoded);
    // combine iv + cipher
    const combined = new Uint8Array(iv.byteLength + cipher.byteLength);
    combined.set(iv, 0);
    combined.set(new Uint8Array(cipher), iv.byteLength);
    return arrayBufferToBase64(combined.buffer);
  };

  const decryptData = async (b64: string): Promise<any> => {
    if (!window.crypto || !crypto.subtle) {
      // fallback
      try {
        return JSON.parse(b64);
      } catch (e) {
        return [];
      }
    }
    try {
      const combinedBuf = base64ToArrayBuffer(b64);
      const combined = new Uint8Array(combinedBuf);
      const iv = combined.slice(0, 12);
      const cipher = combined.slice(12).buffer;
      const key = await getKey();
      const plain = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: iv }, key, cipher);
      const decoded = new TextDecoder().decode(plain);
      return JSON.parse(decoded);
    } catch (e) {
      console.warn('Failed to decrypt contacts:', e);
      return [];
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (!saved) {
          // nothing saved yet
          return;
        }
        const parsed = await decryptData(saved);
        if (Array.isArray(parsed)) {
          setContacts(parsed);
        } else {
          console.warn('Decrypted contacts were not an array, ignoring');
        }
      } catch (error) {
        console.error('Error loading encrypted contacts:', error);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Save contacts encrypted to localStorage whenever they change
  useEffect(() => {
    (async () => {
      try {
        // CRITICAL: Check for suspicious numbers when saving (still check in plaintext in memory)
        contacts.forEach((contact, index) => {
          if (contact.phone && contact.phone.includes('XXXXXX')) {
            console.error(`🚨 ALERT: Attempting to save contact with suspicious number XXXXXX:`, contact);
          }
        });

        if (contacts.length === 0) {
          // Remove storage if no contacts
          localStorage.removeItem(STORAGE_KEY);
          return;
        }

        const cipher = await encryptData(contacts);
        localStorage.setItem(STORAGE_KEY, cipher);
      } catch (e) {
        console.error('Failed to encrypt/store contacts:', e);
      }
    })();
  }, [contacts]);

  // Get current location
  const getCurrentLocation = (): Promise<{ lat: number; lng: number }> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
          resolve({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error('Error getting location:', error);
          reject(error);
        },
        { timeout: 10000, enableHighAccuracy: true }
      );
    });
  };

  // Send WhatsApp message with location
  const sendWhatsAppMessage = async (contact: EmergencyContact, location: { lat: number; lng: number }) => {
    const message = `🚨 EMERGENCY SOS 🚨

${contact.name}, I need immediate help!

📍 My current location:
https://maps.google.com/?q=${location.lat},${location.lng}

⏰ Time: ${new Date().toLocaleString()}

Please call emergency services and try to reach me immediately.

Sent via EmpowerHer Safety App`;

    const whatsappUrl = `https://wa.me/${contact.phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    
    // CRITICAL DEBUGGING - Log everything about this contact
    console.log('🔍 DEBUG: sendWhatsAppMessage called with:');
    console.log('Contact object:', contact);
    console.log('Contact phone:', contact.phone);
    console.log('Contact phone after regex:', contact.phone.replace(/\D/g, ''));
    console.log('Generated WhatsApp URL:', whatsappUrl);
    console.log('Location:', location);
    
    // Check if the phone number matches the suspicious number
    if (contact.phone.includes('XXXXXX') || contact.phone.replace(/\D/g, '').includes('XXXXXX')) {
      console.error('🚨 ALERT: Found suspicious number XXXXXX in contact:', contact);
      console.error('This number should NOT be in your contacts!');
    }
    
    // Try to open WhatsApp
    window.open(whatsappUrl, '_blank');
  };

  const handleSOSPress = async () => {
    setIsPressed(true);
    
    // Enhanced haptic feedback for mobile
    if (navigator.vibrate) {
      navigator.vibrate([200, 100, 200, 100, 200]);
    }
    
    try {
      // Get current location
      const currentLocation = await getCurrentLocation();
      
      // CRITICAL DEBUGGING - Log everything about the SOS activation
      console.log('🚨 SOS BUTTON PRESSED - DEBUGGING ACTIVATED');
      console.log('Current contacts state:', contacts);
      console.log('Current location:', currentLocation);
      console.log('Number of contacts:', contacts.length);
      
      // Check if there are emergency contacts
      if (contacts.length === 0) {
        console.log('No emergency contacts found');
        alert('No emergency contacts found. Please add emergency contacts first.');
        setShowContacts(true);
        return;
      }
      
      console.log(`SOS ACTIVATED - Sending to ${contacts.length} emergency contacts:`, contacts);
      
      // CRITICAL: Check each contact for suspicious numbers
      contacts.forEach((contact, index) => {
        console.log(`🔍 Contact ${index + 1}:`, contact);
        if (contact.phone.includes('XXXXXX')) {
          console.error(`🚨 ALERT: Contact ${index + 1} contains suspicious number:`, contact);
        }
      });
      
      // Send WhatsApp SOS to all emergency contacts
      contacts.forEach(contact => {
        console.log(`Sending WhatsApp SOS to: ${contact.name} (${contact.phone})`);
        sendWhatsAppMessage(contact, currentLocation);
      });

      // Start calling via Twilio through backend
      setIsCallingContacts(true);
      setCallingTimer(0);

      // Start a timer display (counts up to show time spent calling)
      const timerInterval = setInterval(() => {
        setCallingTimer((prev) => prev + 1);
      }, 1000);

      // Call the backend API to trigger Twilio calls
      try {
        const SERVER_URL = (window as any).EMPOWERHER_SERVER_URL || 'http://localhost:5000';
        const phoneNumbers = contacts.map(c => c.phone);

        const response = await fetch(`${SERVER_URL}/call`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            phoneNumbers,
            message: `Emergency SOS alert at location: https://maps.google.com/?q=${currentLocation.lat},${currentLocation.lng}`,
            userName: 'User',
          }),
        });

        const data = await response.json();
        console.log('🚀 Server call response:', data);

        // Keep timer running for 30 seconds after initiating calls
        setTimeout(() => {
          clearInterval(timerInterval);
          setIsCallingContacts(false);
          setCallingTimer(0);
          alert('Emergency contacts called successfully!');
        }, 30000);

      } catch (e) {
        console.error('Failed to call server:', e);
        clearInterval(timerInterval);
        setIsCallingContacts(false);
        setCallingTimer(0);
        alert('Error calling emergency contacts. Please try again.');
      }
      
      console.log('SOS ACTIVATED - Messages sent and calls initiated');
      
    } catch (error) {
      console.error('Error during SOS activation:', error);
      alert('Error getting location. Please ensure location services are enabled.');
    }
    
    // Reset button after animation (keep timer running separately)
    setTimeout(() => setIsPressed(false), 3000);
  };

  return (
    <>
      <div className={`fixed z-40 flex flex-col items-end space-y-3 ${
        isMobile 
          ? 'bottom-4 right-4 space-y-2' 
          : 'bottom-6 right-6 space-y-3'
      }`}>
        {/* Calling Status Display */}
        {isCallingContacts && (
          <div className="glass-container px-4 py-3 rounded-lg flex items-center space-x-2 animate-pulse">
            <div className="w-2 h-2 bg-destructive rounded-full animate-pulse"></div>
            <div className="text-sm font-medium text-destructive">
              Calling {contacts.length} contact{contacts.length !== 1 ? 's' : ''}... ({callingTimer}s)
            </div>
          </div>
        )}

        {/* SOS Button */}
        <button
          onClick={handleSOSPress}
          disabled={isCallingContacts}
          className={`sos-button group ${isPressed ? 'scale-110' : ''} ${
            isMobile ? 'p-5' : 'p-4'
          } ${isCallingContacts ? 'opacity-50 cursor-not-allowed' : ''}`}
          aria-label="Emergency SOS Button"
        >
          <div className="flex items-center justify-center">
            <AlertTriangle 
              size={isMobile ? 32 : 28} 
              className={`transition-transform duration-300 ${
                isPressed ? 'scale-125 animate-pulse' : 'group-hover:scale-110'
              }`}
            />
          </div>
          
          {isPressed && (
            <div className="absolute inset-0 rounded-full bg-destructive/20 animate-ping" />
          )}
          
          {/* Tooltip - Hidden on mobile */}
          {!isMobile && (
            <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="glass-container px-3 py-2 text-sm font-medium whitespace-nowrap">
                {isCallingContacts ? 'Calling emergency contacts...' : 'Emergency SOS'}
              </div>
            </div>
          )}
        </button>
      </div>

      {/* Emergency Contacts Modal */}
      <EmergencyContacts
        isOpen={showContacts}
        onClose={() => setShowContacts(false)}
        contacts={contacts}
        onAddContact={(contact) => {
          console.log('➕ DEBUG: Adding new contact:', contact);
          
          // CRITICAL: Check for suspicious numbers when adding
          if (contact.phone && contact.phone.includes('XXXXXX')) {
            console.error(`🚨 ALERT: Attempting to add contact with suspicious number XXXXXX:`, contact);
          }
          
          const newContact = { ...contact, id: Date.now().toString() };
          setContacts([...contacts, newContact]);
        }}
        onEditContact={(id, contact) => {
          console.log('✏️ DEBUG: Editing contact:', { id, contact });
          
          // CRITICAL: Check for suspicious numbers when editing
          if (contact.phone && contact.phone.includes('XXXXXX')) {
            console.error(`🚨 ALERT: Attempting to edit contact with suspicious number XXXXXX:`, contact);
            }
          
          setContacts(contacts.map(c => c.id === id ? { ...contact, id } : c));
        }}
        onDeleteContact={(id) => {
          console.log('🗑️ DEBUG: Deleting contact with id:', id);
          setContacts(contacts.filter(c => c.id !== id));
        }}
      />
    </>
  );
};

export default SOSButton;