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

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Load contacts from localStorage on component mount
  useEffect(() => {
    console.log('🔍 DEBUG: Loading contacts from localStorage...');
    const savedContacts = localStorage.getItem('emergencyContacts');
    console.log('Raw localStorage data:', savedContacts);
    
    if (savedContacts) {
      try {
        const parsedContacts = JSON.parse(savedContacts);
        console.log('Parsed contacts:', parsedContacts);
        
        // CRITICAL: Check for suspicious numbers in loaded contacts
        parsedContacts.forEach((contact, index) => {
          if (contact.phone && contact.phone.includes('XXXXXX')) {
            console.error(`🚨 ALERT: Found suspicious number XXXXXX in loaded contact ${index + 1}:`, contact);
          }
        });
        
        setContacts(parsedContacts);
      } catch (error) {
        console.error('Error parsing contacts from localStorage:', error);
        setContacts([]);
      }
    } else {
      console.log('No contacts found in localStorage');
    }
  }, []);

  // Save contacts to localStorage whenever they change
  useEffect(() => {
    console.log('💾 DEBUG: Saving contacts to localStorage:', contacts);
    localStorage.setItem('emergencyContacts', JSON.stringify(contacts));
    
    // CRITICAL: Check for suspicious numbers when saving
    contacts.forEach((contact, index) => {
      if (contact.phone && contact.phone.includes('XXXXXX')) {
        console.error(`🚨 ALERT: Attempting to save contact with suspicious number XXXXXX:`, contact);
      }
    });
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
      
      // Send SOS to all emergency contacts
      contacts.forEach(contact => {
        console.log(`Sending SOS to: ${contact.name} (${contact.phone})`);
        sendWhatsAppMessage(contact, currentLocation);
      });
      
      // Enhanced emergency services calling for mobile
      // if (isMobile) {
      //   // Try to call emergency services
      //   try {
      //     window.location.href = 'tel:911';
      //   } catch (error) {
      //     console.log('Could not initiate emergency call');
      //   }
      // }
      
      console.log('SOS ACTIVATED - Messages sent to all emergency contacts');
      
    } catch (error) {
      console.error('Error during SOS activation:', error);
      alert('Error getting location. Please ensure location services are enabled.');
    }
    
    // Reset after animation
    setTimeout(() => setIsPressed(false), 3000);
  };

  return (
    <>
      <div className={`fixed z-40 flex flex-col items-end space-y-3 ${
        isMobile 
          ? 'bottom-4 right-4 space-y-2' 
          : 'bottom-6 right-6 space-y-3'
      }`}>
        {/* SOS Button */}
        <button
          onClick={handleSOSPress}
          className={`sos-button group ${isPressed ? 'scale-110' : ''} ${
            isMobile ? 'p-5' : 'p-4'
          }`}
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
                Emergency SOS
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