// Support page functionality

document.addEventListener('DOMContentLoaded', function() {
    // Donation form functionality
    const amountButtons = document.querySelectorAll('.amount-btn');
    const customAmountInput = document.getElementById('custom-amount');
    
    if (amountButtons.length > 0 && customAmountInput) {
        amountButtons.forEach(button => {
            button.addEventListener('click', () => {
                amountButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                customAmountInput.value = button.dataset.amount;
            });
        });
        
        customAmountInput.addEventListener('input', () => {
            amountButtons.forEach(btn => btn.classList.remove('active'));
        });
    }

    // Donation form submission
    const donationForm = document.getElementById('donation-form');
    if (donationForm) {
        donationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const amount = customAmountInput.value || document.querySelector('.amount-btn.active')?.dataset.amount;
            
            if (!amount || amount <= 0) {
                alert('Please select or enter a valid donation amount.');
                return;
            }
            
            alert('Thank you for your donation! You will be redirected to our secure payment portal.');
        });
    }

    // Volunteer form submission
    const volunteerForm = document.getElementById('volunteer-form');
    if (volunteerForm) {
        volunteerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Check if at least one interest is selected
            const interests = this.querySelectorAll('input[name="interests"]:checked');
            if (interests.length === 0) {
                alert('Please select at least one area of interest.');
                return;
            }
            
            alert('Thank you for your interest in volunteering! We will contact you soon with next steps.');
            this.reset();
        });
    }

    // Share button functionality
    const shareButtons = document.querySelectorAll('.share-btn');
    shareButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            const platform = button.classList.contains('facebook') ? 'Facebook' : 
                           button.classList.contains('twitter') ? 'Twitter' : 'WhatsApp';
            
            // In a real implementation, these would open the actual sharing dialogs
            if (navigator.share) {
                navigator.share({
                    title: 'Belayneh Bahiru - Unity. Justice. Progress.',
                    text: 'Join the movement for positive change in our community.',
                    url: window.location.href
                }).catch(console.error);
            } else {
                alert(`Share functionality for ${platform} would open here. In a real implementation, this would open the ${platform} sharing dialog.`);
            }
        });
    });

    // Smooth scroll to sections
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});