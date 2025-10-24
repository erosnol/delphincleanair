import { Shield, Lock, Eye, Mail, MapPin, Phone } from 'lucide-react';

export default function PrivacyPolicyPage() {
  const currentDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-10 h-10 text-blue-600" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your privacy is important to us. Learn how we collect, use, and protect your personal information.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last Updated: {currentDate}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            
            {/* Introduction */}
            <div className="bg-blue-50 p-8 rounded-2xl mb-12">
              <p className="text-gray-700 text-lg leading-relaxed">
                At <strong>Delphin Clean Air</strong>, we value your privacy and are committed to protecting your personal information. 
                This Privacy Policy explains how we collect, use, and safeguard the information you provide when you interact with us — 
                online, in person, or through promotional campaigns such as appointment bookings and giveaways.
              </p>
            </div>

            {/* Section 1: Information We Collect */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <Eye className="w-6 h-6 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">1. Information We Collect</h2>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-xl">
                <p className="text-gray-700 mb-4">We may collect:</p>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="bg-blue-100 w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Your name, email address, and phone number when you fill out our contact or booking forms.
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-100 w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Basic information about your home environment (e.g., allergy or air quality concerns) to help us tailor your demo.
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-100 w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Technical data such as IP address, browser type, and device information when you visit our website or online ads.
                  </li>
                </ul>
              </div>
            </div>

            {/* Section 2: How We Use Your Information */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <div className="bg-purple-100 p-3 rounded-full mr-4">
                  <Lock className="w-6 h-6 text-purple-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">2. How We Use Your Information</h2>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-xl">
                <p className="text-gray-700 mb-4">We use your information to:</p>
                <ul className="space-y-3 text-gray-700 mb-6">
                  <li className="flex items-start">
                    <span className="bg-purple-100 w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Schedule your appointment or demonstration.
                  </li>
                  <li className="flex items-start">
                    <span className="bg-purple-100 w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Provide information about our air-cleaning systems and free gifts.
                  </li>
                  <li className="flex items-start">
                    <span className="bg-purple-100 w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Send follow-up emails, texts, or calls related to your booking.
                  </li>
                  <li className="flex items-start">
                    <span className="bg-purple-100 w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Improve our marketing campaigns and customer experience.
                  </li>
                </ul>
                <div className="bg-green-100 p-4 rounded-lg">
                  <p className="text-green-800 font-semibold">
                    We do not sell, rent, or share your information with third parties for profit.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 3: Data Protection */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <div className="bg-red-100 p-3 rounded-full mr-4">
                  <Shield className="w-6 h-6 text-red-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">3. Data Protection</h2>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-xl">
                <ul className="space-y-4 text-gray-700">
                  <li className="flex items-start">
                    <span className="bg-red-100 w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Your data is stored securely and accessible only to authorized Delphin Clean Air representatives.
                  </li>
                  <li className="flex items-start">
                    <span className="bg-red-100 w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    We implement industry-standard safeguards to prevent unauthorized access, disclosure, or misuse of your personal data.
                  </li>
                </ul>
              </div>
            </div>

            {/* Section 4: Cookies and Tracking */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <div className="bg-yellow-100 p-3 rounded-full mr-4">
                  <Eye className="w-6 h-6 text-yellow-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">4. Cookies and Tracking</h2>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-xl">
                <p className="text-gray-700">
                  We may use cookies or tracking pixels for ad performance analysis and to personalize your browsing experience. 
                  You can disable cookies in your browser at any time.
                </p>
              </div>
            </div>

            {/* Section 5: Your Rights */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <div className="bg-indigo-100 p-3 rounded-full mr-4">
                  <Shield className="w-6 h-6 text-indigo-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">5. Your Rights</h2>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-xl">
                <p className="text-gray-700 mb-4">You have the right to:</p>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="bg-indigo-100 w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Access, update, or request deletion of your personal data.
                  </li>
                  <li className="flex items-start">
                    <span className="bg-indigo-100 w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Opt out of future communications by clicking "unsubscribe" in any email or contacting us directly.
                  </li>
                </ul>
              </div>
            </div>

            {/* Section 6: Contact Us */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">6. Contact Us</h2>
              </div>
              
              <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-8 rounded-2xl">
                <p className="text-blue-100 mb-6 text-lg">
                  If you have questions or concerns about this Privacy Policy, please contact us at:
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-center">
                    <Mail className="w-6 h-6 mr-3 text-blue-200" />
                    <div>
                      <p className="font-semibold">Email</p>
                      <a href="mailto:info@delphincleanair.com" className="text-blue-200 hover:text-white transition-colors">
                        info@delphincleanair.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <MapPin className="w-6 h-6 mr-3 text-blue-200" />
                    <div>
                      <p className="font-semibold">Address</p>
                      <p className="text-blue-200">Delphin Clean Air</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Ready to Experience Cleaner Air?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Schedule your free in-home demonstration today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/#free-gift"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
            >
              Claim Your Free Demo
            </a>
            <a
              href="/#booking"
              className="bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
            >
              Schedule Consultation
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
