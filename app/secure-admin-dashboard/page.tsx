'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Users, Mail, Calendar, BookOpen, TrendingUp, Phone, MapPin, MessageSquare, Plus, Edit, Trash2, Star, Video, Image as ImageIcon, Type, Check, X, LogOut, Shield } from 'lucide-react';
import TestimonialForm from '@/components/TestimonialForm';

interface Lead {
  id: string;
  fields: {
    'First Name': string;
    'Last Name'?: string;
    'Email': string;
    'Phone'?: string;
    'Source': string;
    'Created At': string;
    'Status': string;
    'Details': string;
  };
}

interface Testimonial {
  id: string;
  fields: {
    'Type': string;
    'Content': string;
    'Author': string;
    'Location'?: string;
    'Rating'?: number;
    'Video URL'?: string;
    'Image URL'?: string;
    'TikTok URL'?: string;
    'Date': string;
    'Is Approved': boolean;
    'Created At': string;
  };
}

export default function SecureAdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [testimonialsLoading, setTestimonialsLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('leads');
  const [showTestimonialForm, setShowTestimonialForm] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);

  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session) {
      router.push('/admin-login');
      return;
    }

    fetchLeads();
    fetchTestimonials();
  }, [session, status, router]);

  const fetchLeads = async () => {
    try {
      const response = await fetch('/api/leads');
      const data = await response.json();
      setLeads(data.records || []);
    } catch (error) {
      console.error('Failed to fetch leads:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTestimonials = async () => {
    try {
      const response = await fetch('/api/testimonials');
      const data = await response.json();
      setTestimonials(data.records || []);
    } catch (error) {
      console.error('Failed to fetch testimonials:', error);
    } finally {
      setTestimonialsLoading(false);
    }
  };

  const handleTestimonialSubmit = async (testimonialData: any) => {
    try {
      if (editingTestimonial) {
        await fetch('/api/testimonials', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(testimonialData),
        });
      } else {
        await fetch('/api/testimonials', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(testimonialData),
        });
      }
      
      fetchTestimonials();
      setShowTestimonialForm(false);
      setEditingTestimonial(null);
    } catch (error) {
      console.error('Failed to save testimonial:', error);
    }
  };

  const handleDeleteTestimonial = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;
    
    try {
      await fetch(`/api/testimonials?id=${id}`, {
        method: 'DELETE',
      });
      fetchTestimonials();
    } catch (error) {
      console.error('Failed to delete testimonial:', error);
    }
  };

  const handleApproveTestimonial = async (testimonial: Testimonial) => {
    try {
      await fetch('/api/testimonials', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: testimonial.id,
          isApproved: !testimonial.fields['Is Approved'],
        }),
      });
      fetchTestimonials();
    } catch (error) {
      console.error('Failed to update testimonial approval:', error);
    }
  };

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'air-washer-gift': return <Users className="w-5 h-5 text-blue-500" />;
      case 'booking': return <Calendar className="w-5 h-5 text-green-500" />;
      case 'affiliate': return <TrendingUp className="w-5 h-5 text-orange-500" />;
      case 'job-application': return <Users className="w-5 h-5 text-red-500" />;
      default: return <Mail className="w-5 h-5 text-gray-500" />;
    }
  };

  const getSourceLabel = (source: string) => {
    switch (source) {
      case 'air-washer-gift': return 'Air Washer Gift';
      case 'booking': return 'Consultation';
      case 'affiliate': return 'Affiliate Application';
      case 'job-application': return 'Job Application';
      default: return source;
    }
  };

  const filteredLeads = leads.filter(lead => 
    filter === 'all' || lead.fields.Source === filter
  );

  const stats = {
    total: leads.length,
    freeGift: leads.filter(l => l.fields.Source === 'air-washer-gift').length,
    booking: leads.filter(l => l.fields.Source === 'booking').length,
    affiliate: leads.filter(l => l.fields.Source === 'affiliate').length,
    jobApplication: leads.filter(l => l.fields.Source === 'job-application').length,
  };

  const testimonialStats = {
    total: testimonials.length,
    approved: testimonials.filter(t => t.fields['Is Approved']).length,
    pending: testimonials.filter(t => !t.fields['Is Approved']).length,
    text: testimonials.filter(t => t.fields.Type === 'text').length,
    video: testimonials.filter(t => t.fields.Type === 'video').length,
    image: testimonials.filter(t => t.fields.Type === 'image').length,
  };

  const getTestimonialIcon = (type: string) => {
    switch (type) {
      case 'text': return <Type className="w-5 h-5 text-blue-500" />;
      case 'video': return <Video className="w-5 h-5 text-green-500" />;
      case 'image': return <ImageIcon className="w-5 h-5 text-purple-500" />;
      default: return <MessageSquare className="w-5 h-5 text-gray-500" />;
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Authenticating...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null; // Will redirect in useEffect
  }

  if (loading && testimonialsLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with User Info */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Delphin Clean Air - Admin Dashboard</h1>
            <p className="text-gray-600">Manage leads, testimonials, and website content</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Shield className="w-4 h-4" />
              <span>{session.user?.email}</span>
            </div>
            <button
              onClick={handleSignOut}
              className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('leads')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'leads'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Users className="w-5 h-5 inline mr-2" />
                Leads ({stats.total})
              </button>
              <button
                onClick={() => setActiveTab('testimonials')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'testimonials'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <MessageSquare className="w-5 h-5 inline mr-2" />
                Testimonials ({testimonialStats.total})
              </button>
            </nav>
          </div>
        </div>

        {/* Stats Cards */}
        {activeTab === 'leads' && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Users className="w-8 h-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Leads</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Users className="w-8 h-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Air Washer Gifts</p>
                <p className="text-2xl font-bold text-gray-900">{stats.freeGift}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Calendar className="w-8 h-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Bookings</p>
                <p className="text-2xl font-bold text-gray-900">{stats.booking}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <TrendingUp className="w-8 h-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Affiliates</p>
                <p className="text-2xl font-bold text-gray-900">{stats.affiliate}</p>
              </div>
            </div>
          </div>
        </div>
        )}

        {activeTab === 'testimonials' && (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <MessageSquare className="w-8 h-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total</p>
                <p className="text-2xl font-bold text-gray-900">{testimonialStats.total}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Check className="w-8 h-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Approved</p>
                <p className="text-2xl font-bold text-gray-900">{testimonialStats.approved}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <X className="w-8 h-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">{testimonialStats.pending}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Type className="w-8 h-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Text</p>
                <p className="text-2xl font-bold text-gray-900">{testimonialStats.text}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Video className="w-8 h-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Videos</p>
                <p className="text-2xl font-bold text-gray-900">{testimonialStats.video}</p>
              </div>
            </div>
          </div>
        </div>
        )}

        {/* Leads Section */}
        {activeTab === 'leads' && (
        <>
        {/* Filters */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex space-x-4">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  filter === 'all' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                All ({stats.total})
              </button>
              <button
                onClick={() => setFilter('air-washer-gift')}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  filter === 'air-washer-gift' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Air Washer Gifts ({stats.freeGift})
              </button>
              <button
                onClick={() => setFilter('booking')}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  filter === 'booking' ? 'bg-green-100 text-green-700' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Bookings ({stats.booking})
              </button>
              <button
                onClick={() => setFilter('affiliate')}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  filter === 'affiliate' ? 'bg-orange-100 text-orange-700' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Affiliates ({stats.affiliate})
              </button>
            </div>
          </div>
        </div>

        {/* Leads Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Recent Leads</h2>
          </div>
          
          {filteredLeads.length === 0 ? (
            <div className="text-center py-12">
              <Mail className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No leads found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Source
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Details
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredLeads.map((lead) => {
                    const details = lead.fields.Details ? JSON.parse(lead.fields.Details) : {};
                    return (
                      <tr key={lead.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {lead.fields['First Name']} {lead.fields['Last Name'] || ''}
                            </div>
                            <div className="text-sm text-gray-500 flex items-center mt-1">
                              <Mail className="w-4 h-4 mr-1" />
                              {lead.fields.Email}
                            </div>
                            {lead.fields.Phone && (
                              <div className="text-sm text-gray-500 flex items-center mt-1">
                                <Phone className="w-4 h-4 mr-1" />
                                {lead.fields.Phone}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {getSourceIcon(lead.fields.Source)}
                            <span className="ml-2 text-sm text-gray-900">
                              {getSourceLabel(lead.fields.Source)}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(lead.fields['Created At']).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            lead.fields.Status === 'New' 
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {lead.fields.Status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {lead.fields.Source === 'booking' && details.consultationType && (
                            <div>Type: {details.consultationType}</div>
                          )}
                          {details.address && (
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              {details.address}
                            </div>
                          )}
                          {details.platform && (
                            <div>Platform: {details.platform}</div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
        </>
        )}

        {/* Testimonials Section */}
        {activeTab === 'testimonials' && (
        <>
        {/* Testimonials Header */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900">Testimonials Management</h2>
            <button
              onClick={() => {
                setEditingTestimonial(null);
                setShowTestimonialForm(true);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Testimonial
            </button>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {testimonialsLoading ? (
            <div className="col-span-full text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading testimonials...</p>
            </div>
          ) : testimonials.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No testimonials found</p>
              <button
                onClick={() => {
                  setEditingTestimonial(null);
                  setShowTestimonialForm(true);
                }}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Add First Testimonial
              </button>
            </div>
          ) : (
            testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      {getTestimonialIcon(testimonial.fields.Type)}
                      <span className="ml-2 text-sm font-medium text-gray-700 capitalize">
                        {testimonial.fields.Type}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          setEditingTestimonial(testimonial);
                          setShowTestimonialForm(true);
                        }}
                        className="text-gray-400 hover:text-blue-600 transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteTestimonial(testimonial.id)}
                        className="text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {testimonial.fields.Author}
                    </h3>
                    {testimonial.fields.Location && (
                      <p className="text-sm text-gray-500 mb-2">{testimonial.fields.Location}</p>
                    )}
                    {testimonial.fields.Type === 'text' && testimonial.fields.Rating && (
                      <div className="flex items-center mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < testimonial.fields.Rating!
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                    <p className="text-gray-700 text-sm line-clamp-3">
                      {testimonial.fields.Content}
                    </p>
                  </div>

                  {testimonial.fields['Video URL'] && (
                    <div className="mb-4">
                      <p className="text-xs text-gray-500 mb-1">Video URL:</p>
                      <p className="text-xs text-blue-600 truncate">
                        {testimonial.fields['Video URL']}
                      </p>
                    </div>
                  )}

                  {testimonial.fields['Image URL'] && (
                    <div className="mb-4">
                      <p className="text-xs text-gray-500 mb-1">Image URL:</p>
                      <p className="text-xs text-blue-600 truncate">
                        {testimonial.fields['Image URL']}
                      </p>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <span className="text-xs text-gray-500">
                      {new Date(testimonial.fields.Date).toLocaleDateString()}
                    </span>
                    <button
                      onClick={() => handleApproveTestimonial(testimonial)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                        testimonial.fields['Is Approved']
                          ? 'bg-green-100 text-green-800 hover:bg-green-200'
                          : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                      }`}
                    >
                      {testimonial.fields['Is Approved'] ? 'Approved' : 'Pending'}
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        </>
        )}

        {/* Testimonial Form Modal */}
        {showTestimonialForm && (
          <TestimonialForm
            onClose={() => {
              setShowTestimonialForm(false);
              setEditingTestimonial(null);
            }}
            onSubmit={handleTestimonialSubmit}
            editingTestimonial={editingTestimonial}
          />
        )}
      </div>
    </div>
  );
}
