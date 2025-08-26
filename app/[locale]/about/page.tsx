import { useTranslations } from 'next-intl';
import { ExternalLink, Award, Users, Globe, Heart } from 'lucide-react';

export default function AboutPage() {
  const t = useTranslations();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              About Delphin Clean Air
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Revolutionizing indoor air quality for over 80 years with innovative water-based purification technology
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Our Story: Eight Decades of Innovation
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
              <div>
                <p className="text-gray-700 mb-6">
                  Since 1943, Delphin has been at the forefront of air purification technology. What started as a vision to create healthier indoor environments has evolved into a global mission to transform how families breathe at home.
                </p>
                <p className="text-gray-700 mb-6">
                  Our revolutionary water-based air purification system doesn't just filter air—it washes it. Using the natural power of water, Delphin systems capture particles, allergens, and pollutants that traditional filters miss, delivering truly clean air to your family.
                </p>
                <p className="text-gray-700">
                  From our headquarters in Germany to homes worldwide, Delphin continues to innovate, ensuring that every breath you take is cleaner, healthier, and purer.
                </p>
              </div>
              
              <div className="bg-blue-50 p-8 rounded-2xl">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Water Works Better</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="bg-blue-100 p-2 rounded-full mr-4 mt-1">
                      <Heart className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-gray-700">Captures 99.9% of particles down to 0.3 microns</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-blue-100 p-2 rounded-full mr-4 mt-1">
                      <Globe className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-gray-700">No filters to replace—ever</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-blue-100 p-2 rounded-full mr-4 mt-1">
                      <Users className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-gray-700">Safe for families with allergies and asthma</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-8 rounded-2xl text-center">
              <h3 className="text-2xl font-bold mb-4">
                Trusted by Over 100,000 Families Worldwide
              </h3>
              <p className="text-blue-100 mb-6">
                Join the global community of families who have transformed their indoor air quality with Delphin technology.
              </p>
              <a
                href="https://delphin.net"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-white text-blue-600 font-semibold py-3 px-6 rounded-lg hover:bg-blue-50 transition-colors duration-200"
              >
                Visit Official Delphin Website
                <ExternalLink className="w-5 h-5 ml-2" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Our Core Values
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Innovation</h3>
              <p className="text-gray-600">
                Continuously advancing air purification technology to deliver superior results for our customers.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Health First</h3>
              <p className="text-gray-600">
                Prioritizing the health and well-being of families through cleaner indoor air solutions.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Globe className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Sustainability</h3>
              <p className="text-gray-600">
                Creating eco-friendly solutions that protect both your family and the environment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Ready to Transform Your Indoor Air?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Experience the Delphin difference with a free in-home demonstration
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
