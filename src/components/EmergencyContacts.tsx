import { useState } from 'react';
import { Plus, Edit, Trash2, Phone, User, X } from 'lucide-react';

interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  relationship: string;
}

interface EmergencyContactsProps {
  isOpen: boolean;
  onClose: () => void;
  contacts: EmergencyContact[];
  onAddContact: (contact: Omit<EmergencyContact, 'id'>) => void;
  onEditContact: (id: string, contact: Omit<EmergencyContact, 'id'>) => void;
  onDeleteContact: (id: string) => void;
}

const EmergencyContacts = ({ 
  isOpen, 
  onClose, 
  contacts, 
  onAddContact, 
  onEditContact, 
  onDeleteContact 
}: EmergencyContactsProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    relationship: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      onEditContact(editingId, formData);
      setEditingId(null);
    } else {
      onAddContact(formData);
    }
    setFormData({ name: '', phone: '', relationship: '' });
    setIsAdding(false);
  };

  const handleEdit = (contact: EmergencyContact) => {
    setEditingId(contact.id);
    setFormData({
      name: contact.name,
      phone: contact.phone,
      relationship: contact.relationship
    });
    setIsAdding(true);
  };

  const handleCancel = () => {
    setFormData({ name: '', phone: '', relationship: '' });
    setIsAdding(false);
    setEditingId(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="glass-container w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6 p-6 pb-0">
          <h2 className="text-xl font-semibold">Emergency Contacts</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-purple-800/20 transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Add/Edit Form */}
        {isAdding && (
          <form onSubmit={handleSubmit} className="mx-6 mb-6 p-4 rounded-xl bg-purple-800/20 border border-purple-600/20">
            <h3 className="font-semibold mb-4 text-purple-200">
              {editingId ? 'Edit Contact' : 'Add New Contact'}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-purple-200">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full glass-input"
                  placeholder="Enter full name"
                  required
                  autoComplete="name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-purple-200">Phone Number</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full glass-input"
                  placeholder="+1 (555) 123-4567"
                  required
                  autoComplete="tel"
                  inputMode="tel"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-purple-200">Relationship</label>
                <input
                  type="text"
                  value={formData.relationship}
                  onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
                  className="w-full glass-input"
                  placeholder="e.g., Spouse, Parent, Friend"
                  required
                  autoComplete="off"
                />
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                type="submit"
                className="flex-1 glass-button bg-purple-800/30 text-purple-200 hover:bg-purple-700/40 py-3 border border-purple-600/30"
              >
                {editingId ? 'Update' : 'Add Contact'}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 glass-button py-3 hover:bg-purple-800/20"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Contacts List */}
        <div className="px-6 space-y-3">
          {contacts.length === 0 && !isAdding ? (
            <div className="text-center py-8 text-muted-foreground">
              <User className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No emergency contacts added yet</p>
              <p className="text-sm">Add contacts to receive SOS alerts</p>
            </div>
          ) : (
            contacts.map((contact) => (
              <div key={contact.id} className="p-4 rounded-xl bg-purple-800/20 border border-purple-600/20 hover:bg-purple-700/30 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <User className="w-4 h-4 text-purple-400 flex-shrink-0" />
                      <span className="font-medium truncate text-purple-200">{contact.name}</span>
                    </div>
                    <div className="flex items-center space-x-2 mb-1">
                      <Phone className="w-4 h-4 text-purple-300 flex-shrink-0" />
                      <span className="text-sm text-purple-300 truncate">{contact.phone}</span>
                    </div>
                    <div className="text-xs text-purple-400 truncate">{contact.relationship}</div>
                  </div>
                  
                  <div className="flex items-center space-x-1 ml-3">
                    <button
                      onClick={() => handleEdit(contact)}
                      className="p-2 rounded-lg hover:bg-purple-700/30 transition-colors text-purple-300 hover:text-purple-200"
                      aria-label="Edit contact"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => onDeleteContact(contact.id)}
                      className="p-2 rounded-lg hover:bg-red-600/20 text-red-400 hover:text-red-300 transition-colors"
                      aria-label="Delete contact"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Add Button */}
        {!isAdding && (
          <div className="p-6 pt-3">
            <button
              onClick={() => setIsAdding(true)}
              className="w-full glass-button flex items-center justify-center space-x-2 py-3 bg-purple-800/20 text-purple-200 hover:bg-purple-700/30 border border-purple-600/30"
            >
              <Plus size={20} />
              <span>Add Emergency Contact</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmergencyContacts;
