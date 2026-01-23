import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Verify = () => {
  const navigate = useNavigate();

  useEffect(() => {
  
    navigate('/myorders');
  }, [navigate]);

  return (
    <div className='verify'>
      <div className="spinner">
       
        <p>Processing your order...</p>
      </div>
    </div>
  );
}

export default Verify;
