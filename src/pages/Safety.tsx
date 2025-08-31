import { useState, useEffect } from 'react';
import { Shield, MapPin, Phone, Users, AlertTriangle, CheckCircle, Search, Navigation as NavigationIcon, Plus, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import EmergencyContacts from '../components/EmergencyContacts';
import SOSButton from '../components/SOSButton';
import Footer from '../components/Footer';

interface SafeZone {
  id: string;
  name: string;
  type: 'police' | 'hospital' | 'cafe' | 'fire' | 'other';
  lat: number;
  lng: number;
  description: string;
}

interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  relationship: string;
}

const Safety = () => {
  const navigate = useNavigate();
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [showContacts, setShowContacts] = useState(false);
  const [contacts, setContacts] = useState<EmergencyContact[]>([]);

  const safeZones: SafeZone[] = [
    { id: '1', name: 'Kadri Police Station', type: 'police', lat: 40.7128, lng: -74.0060, description: '24/7 police assistance' },
    { id: '2', name: 'KMC Hospital', type: 'hospital', lat: 40.7589, lng: -73.9851, description: 'Emergency medical care' },
    { id: '3', name: 'Juice Junction', type: 'cafe', lat: 40.7505, lng: -73.9934, description: 'Women-friendly space' },
    { id: '4', name: 'Fire Station #5', type: 'fire', lat: 40.7484, lng: -73.9857, description: 'Emergency fire services' },
    { id: '5', name: 'Community Center', type: 'other', lat: 40.7569, lng: -73.9860, description: 'Safe community space' },
  ];

  useEffect(() => {
    // Load contacts from localStorage
    const savedContacts = localStorage.getItem('emergencyContacts');
    if (savedContacts) {
      setContacts(JSON.parse(savedContacts));
    }

    // Get user location
    getCurrentLocation();
  }, []);

  useEffect(() => {
    // Save contacts to localStorage whenever they change
    localStorage.setItem('emergencyContacts', JSON.stringify(contacts));
  }, [contacts]);

  const getCurrentLocation = () => {
    setIsLoadingLocation(true);
    setLocationError(null);

    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported');
      setIsLoadingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const location = { lat: latitude, lng: longitude };
        setUserLocation(location);
        setIsLoadingLocation(false);
      },
      (error) => {
        console.error('Error getting location:', error);
        setLocationError('Unable to get your location');
        setIsLoadingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  };

  const handleSearchLocation = () => {
    if (!searchQuery.trim()) return;
    
    // Simple search simulation
    alert(`Searching for: ${searchQuery}\n\nThis would integrate with a mapping service to show results.`);
    setSearchQuery('');
  };

  const handleMarkSafe = () => {
    if (userLocation) {
      alert(`✅ Safe zone marked at your current location!\nLat: ${userLocation.lat.toFixed(6)}\nLng: ${userLocation.lng.toFixed(6)}`);
    } else {
      alert('Please enable location services to mark safe zones.');
    }
  };

  const handleReportUnsafe = () => {
    if (userLocation) {
      alert(`⚠️ Unsafe area reported at your current location!\nLat: ${userLocation.lat.toFixed(6)}\nLng: ${userLocation.lng.toFixed(6)}\n\nThis information has been sent to local authorities.`);
    } else {
      alert('Please enable location services to report unsafe areas.');
    }
  };

  return (
    <div className="min-h-screen pt-24 md:pt-32 pb-16 md:pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <div className="flex justify-start mb-6">
          <button
            onClick={() => navigate(-1)}
            className="glass-button flex items-center space-x-2 px-4 py-2 text-sm md:text-base hover:bg-purple-800/20 transition-colors"
          >
            <ArrowLeft size={18} className="md:w-5 md:h-5" />
            <span>Back</span>
          </button>
        </div>

        {/* SOS Button */}
        <div className="flex justify-center mb-8">
          <SOSButton />
        </div>

        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 gradient-text">Safety Hub</h1>
          <p className="text-lg md:text-xl text-muted-foreground px-4">
            Your comprehensive safety toolkit with real-time location tracking and emergency resources
          </p>
        </div>

        {/* Location Search */}
        <div className="glass-card mb-4 md:mb-6 p-4">
          <div className="flex items-center space-x-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search for a location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearchLocation()}
                className="w-full pl-10 pr-4 py-2 bg-glass/50 border border-glass-border/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <button
              onClick={handleSearchLocation}
              className="glass-button px-4 py-2 text-sm"
            >
              Search
            </button>
          </div>
        </div>

        {/* Interactive Map */}
        <div className="glass-card mb-6 md:mb-8 h-80 md:h-96 relative overflow-hidden">
          <div className="w-full h-full rounded-3xl flex items-center justify-center bg-gray-100">
            <img 
              src="/icons/GoogleMaps.png" 
              alt="Google Maps" 
              className="w-full h-full object-cover rounded-3xl"
            />
          </div>
          
          {/* Map Controls Overlay */}
          <div className="absolute top-3 md:top-4 left-3 md:left-4 flex flex-col md:flex-row gap-2">
            <button 
              onClick={handleMarkSafe}
              className="glass-button flex items-center space-x-2 text-success py-2 px-3 md:px-4 text-sm md:text-base"
            >
              <CheckCircle size={18} className="md:w-5 md:h-5" />
              <span className="hidden sm:inline">Mark Safe</span>
              <span className="sm:hidden">Safe</span>
            </button>
            <button 
              onClick={handleReportUnsafe}
              className="glass-button flex items-center space-x-2 text-destructive py-2 px-3 md:px-4 text-sm md:text-base"
            >
              <AlertTriangle size={18} className="md:w-5 md-h-5" />
              <span className="hidden sm:inline">Report Unsafe</span>
              <span className="sm:hidden">Unsafe</span>
            </button>
          </div>

          {/* Location Status */}
          <div className="absolute bottom-3 md:bottom-4 left-3 md:left-4 glass-container px-2 md:px-3 py-1 md:py-2">
            <div className="flex items-center space-x-2">
              {isLoadingLocation ? (
                <>
                  <div className="w-2 h-2 bg-warning rounded-full animate-pulse"></div>
                  <span className="text-xs md:text-sm font-medium">Getting Location...</span>
                </>
              ) : locationError ? (
                <>
                  <div className="w-2 h-2 bg-destructive rounded-full"></div>
                  <span className="text-xs md:text-sm font-medium">Location Error</span>
                </>
              ) : (
                <>
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span className="text-xs md:text-sm font-medium">Location Active</span>
                </>
              )}
            </div>
          </div>

          {/* Refresh Location Button */}
          <button
            onClick={getCurrentLocation}
            className="absolute top-3 md:top-4 right-3 md:right-4 glass-button p-2"
            title="Refresh Location"
          >
            <NavigationIcon size={18} className="md:w-5 md:h-5" />
          </button>
        </div>

        {/* Emergency Contacts Section */}
        <div className="glass-card mb-6 md:mb-8 p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <Users className="w-8 h-8 md:w-10 md:h-10 text-purple-500" />
              <h2 className="text-2xl md:text-3xl font-bold text-purple-500">Emergency Contacts</h2>
            </div>
            <button
              onClick={() => setShowContacts(true)}
              className="glass-button flex items-center space-x-2 px-4 py-2 text-sm md:text-base"
            >
              <Plus size={18} className="md:w-5 md:h-5" />
              <span className="hidden sm:inline">Manage Contacts</span>
              <span className="sm:inline">Manage</span>
            </button>
          </div>

          {contacts.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <Users className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium mb-2">No emergency contacts added yet</p>
              <p className="text-sm">Add your trusted contacts to receive SOS alerts with your live location</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {contacts.map((contact) => (
                <div key={contact.id} className="glass-card p-4 hover-lift">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-2">
                        <Users className="w-5 h-5 text-purple-400 flex-shrink-0" />
                        <h3 className="font-semibold text-purple-400 truncate">{contact.name}</h3>
                      </div>
                      <div className="flex items-center space-x-2 mb-1">
                        <Phone className="w-4 h-4 text-purple-300 flex-shrink-0" />
                        <span className="text-sm text-purple-300 font-mono">{contact.phone}</span>
                      </div>
                      <div className="text-xs text-purple-400 truncate">{contact.relationship}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Nearby Safe Zones */}
        <div className="glass-card p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-purple-500 mb-6 md:mb-8 text-center">Nearby Safe Zones</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {safeZones.map((zone) => (
              <div key={zone.id} className="glass-card p-4 md:p-6 hover-lift border-2 border-purple-400 rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-purple-800 text-lg md:text-xl mb-2">{zone.name}</h3>
                    <p className="text-sm text-gray-300 mb-3">{zone.description}</p>
                    <div className="flex items-center space-x-2 text-xs text-gray-400">
                      <MapPin className="w-4 h-4" />
                      <span>{zone.lat.toFixed(4)}, {zone.lng.toFixed(4)}</span>
                    </div>
                  </div>
                  <div className="ml-3">
                    <div 
                      className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center"
                      style={{ 
                        backgroundColor: zone.type === 'police' ? '#3B82F6' : 
                                     zone.type === 'hospital' ? '#EF4444' : 
                                     zone.type === 'cafe' ? '#10B981' : 
                                     zone.type === 'fire' ? '#F59E0B' : '#8B5CF6' 
                      }}
                    >
                      <Shield className="w-4 h-4 md:w-5 md:h-5 text-white" />
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => alert(`Getting directions to ${zone.name}`)}
                  className="w-full glass-button py-2 px-4 text-sm font-medium"
                >
                  Get Directions
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Emergency Contacts Modal */}
      <EmergencyContacts
        isOpen={showContacts}
        onClose={() => setShowContacts(false)}
        contacts={contacts}
        onAddContact={(contact) => {
          const newContact = { ...contact, id: Date.now().toString() };
          setContacts([...contacts, newContact]);
        }}
        onEditContact={(id, contact) => {
          setContacts(contacts.map(c => c.id === id ? { ...contact, id } : c));
        }}
        onDeleteContact={(id) => {
          setContacts(contacts.filter(c => c.id !== id));
        }}
      />
      
      <Footer />
    </div>
  );
};

export default Safety;