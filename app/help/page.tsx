import React from 'react'

function page() {
    return (
        <div className="min-h-screen bg-gray-100 p-6">
          <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-black mb-6 text-center">
              Help & Support
            </h1>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-black mb-4">
                Introduction
              </h2>
              <p className="text-lg text-gray-700">
                Welcome to the POGO TAXI Help Center! Here, you'll find answers to common questions, how-to guides, and information on how to contact our support team. If you need further assistance, feel free to reach out to us.
              </p>
            </section>
    
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-black mb-4">
                Frequently Asked Questions (FAQs)
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">
                    How do I book a ride?
                  </h3>
                  <p className="text-gray-700">
                    To book a ride, open the POGO TAXI app, enter your pickup and drop-off locations, select your ride type, and confirm your booking.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">
                    What should I do if I left something in the taxi?
                  </h3>
                  <p className="text-gray-700">
                    If you left an item in the taxi, please contact our support team immediately with your ride details, and we will help you retrieve it.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">
                    How can I update my account information?
                  </h3>
                  <p className="text-gray-700">
                    To update your account information, log in to your account on our website or app and navigate to the "Account Settings" section.
                  </p>
                </div>
              </div>
            </section>
    
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-black mb-4">
                Contact Us
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                If you need further assistance, you can contact our support team using the following methods:
              </p>
              <ul className="list-disc pl-6 text-gray-700">
                <li>Email: <a href="mailto:support@pogotaxi.com" className="text-blue-500">support@pogotaxi.com</a></li>
                <li>Phone: <a href="tel:+1234567890" className="text-blue-500">+1 (234) 567-890</a></li>
                <li>Support Form: <a href="/support-form" className="text-blue-500">Submit a Support Ticket</a></li>
              </ul>
            </section>
    
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-black mb-4">
                How-To Guides
              </h2>
              <p className="text-lg text-gray-700">
                For step-by-step instructions on various tasks, please visit our <a href="/how-to-guides" className="text-blue-500">How-To Guides</a> page.
              </p>
            </section>
    
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-black mb-4">
                Live Chat
              </h2>
              <p className="text-lg text-gray-700">
                For immediate assistance, you can use our live chat feature available on the bottom-right corner of the screen.
              </p>
            </section>
    
        
          </div>
        </div>
      );
    }
    

export default page
