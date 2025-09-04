import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Card, CardHeader, CardTitle } from '../../components/ui/Card';
import { TrendingUp, Upload, Camera, CheckCircle, Clock, ArrowRight, ArrowLeft } from 'lucide-react';

export function KYCVerification() {
  const [idUploaded, setIdUploaded] = useState(false);
  const [addressUploaded, setAddressUploaded] = useState(false);
  const [selfieUploaded, setSelfieUploaded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleFileUpload = (type: 'id' | 'address' | 'selfie') => {
    // Simulate file upload
    setTimeout(() => {
      switch (type) {
        case 'id':
          setIdUploaded(true);
          break;
        case 'address':
          setAddressUploaded(true);
          break;
        case 'selfie':
          setSelfieUploaded(true);
          break;
      }
    }, 1000);
  };

  const handleSubmit = async () => {
    if (idUploaded && addressUploaded && selfieUploaded) {
      setIsSubmitting(true);
      await new Promise(resolve => setTimeout(resolve, 2000));
      navigate('/onboarding/payment');
      setIsSubmitting(false);
    }
  };

  const allDocumentsUploaded = idUploaded && addressUploaded && selfieUploaded;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="flex justify-center items-center space-x-2 mb-4">
            <TrendingUp className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">Bons-AI</span>
          </div>
          <div className="flex justify-center mb-6">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-8 h-8 bg-green-600 text-white rounded-full text-sm font-semibold">
                ✓
              </div>
              <div className="w-16 h-1 bg-green-600 mx-2"></div>
              <div className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full text-sm font-semibold">
                2
              </div>
              <div className="w-16 h-1 bg-gray-300 mx-2"></div>
              <div className="flex items-center justify-center w-8 h-8 bg-gray-300 text-gray-600 rounded-full text-sm font-semibold">
                3
              </div>
              <div className="w-16 h-1 bg-gray-300 mx-2"></div>
              <div className="flex items-center justify-center w-8 h-8 bg-gray-300 text-gray-600 rounded-full text-sm font-semibold">
                4
              </div>
              <div className="w-16 h-1 bg-gray-300 mx-2"></div>
              <div className="flex items-center justify-center w-8 h-8 bg-gray-300 text-gray-600 rounded-full text-sm font-semibold">
                5
              </div>
            </div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Identity Verification (KYC)</CardTitle>
            <p className="text-gray-600">
              Please upload the required documents to verify your identity. This helps us maintain security and comply with regulations.
            </p>
          </CardHeader>

          <div className="space-y-6">
            {/* Government ID */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
              <div className="flex flex-col items-center">
                {idUploaded ? (
                  <>
                    <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
                    <h3 className="text-lg font-semibold text-green-600 mb-2">Government ID Uploaded</h3>
                    <p className="text-sm text-gray-600">drivers_license.jpg</p>
                  </>
                ) : (
                  <>
                    <Upload className="h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload Government ID</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Driver's license, passport, or national ID card
                    </p>
                    <Button 
                      variant="outline"
                      onClick={() => handleFileUpload('id')}
                    >
                      Choose File
                    </Button>
                  </>
                )}
              </div>
            </div>

            {/* Proof of Address */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
              <div className="flex flex-col items-center">
                {addressUploaded ? (
                  <>
                    <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
                    <h3 className="text-lg font-semibold text-green-600 mb-2">Proof of Address Uploaded</h3>
                    <p className="text-sm text-gray-600">utility_bill.pdf</p>
                  </>
                ) : (
                  <>
                    <Upload className="h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload Proof of Address</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Utility bill, bank statement, or government document (last 3 months)
                    </p>
                    <Button 
                      variant="outline"
                      onClick={() => handleFileUpload('address')}
                    >
                      Choose File
                    </Button>
                  </>
                )}
              </div>
            </div>

            {/* Selfie Verification */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
              <div className="flex flex-col items-center">
                {selfieUploaded ? (
                  <>
                    <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
                    <h3 className="text-lg font-semibold text-green-600 mb-2">Selfie Verification Complete</h3>
                    <p className="text-sm text-gray-600">Identity verified successfully</p>
                  </>
                ) : (
                  <>
                    <Camera className="h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Take a Selfie</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Hold your ID next to your face and take a clear photo
                    </p>
                    <Button 
                      variant="outline"
                      onClick={() => handleFileUpload('selfie')}
                    >
                      Take Photo
                    </Button>
                  </>
                )}
              </div>
            </div>

            {/* Verification Status */}
            <Card className="bg-yellow-50 border-yellow-200">
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-yellow-600 mr-3" />
                <div>
                  <p className="font-medium text-yellow-800">Verification Status: Pending</p>
                  <p className="text-sm text-yellow-700">
                    Your documents will be reviewed within 24-48 hours
                  </p>
                </div>
              </div>
            </Card>

            <div className="flex justify-between pt-6">
              <Button
                type="button"
                variant="ghost"
                onClick={() => navigate('/onboarding/personal-details')}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!allDocumentsUploaded}
                loading={isSubmitting}
              >
                Continue to Payment
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}