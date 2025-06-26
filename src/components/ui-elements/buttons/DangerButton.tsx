import React from 'react';
import '../../../style/DangerButton.css';
interface DangerButtonProps {
    text: string;
    onClick?: () => void;
}

const DangerButton: React.FC<DangerButtonProps> = ({ text, onClick }) => {
    return (
        <button className="danger-button" onClick={onClick}>
            {text}
        </button>
    );
};

export default DangerButton;