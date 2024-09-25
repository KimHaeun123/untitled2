const PrivacyPolicy: React.FC = () => {
    const handleLinkClick = () => {
        window.open('https://www.privacypolicies.com/live/4aeef333-05f2-4130-b115-6ab9de371257', '_blank');
    };

    return (
        <div>
            <h2 onClick={handleLinkClick} style={{ cursor: 'pointer', color: 'blue' }}>
                Privacy Policy
            </h2>
        </div>
    );
};

export default PrivacyPolicy;