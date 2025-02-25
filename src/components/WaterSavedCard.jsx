// src/components/WaterSavedCard.jsx
import React from "react";
import "./WaterSavedCard.css";
import { FaTint } from "react-icons/fa";

const WaterSavedCard = ({ totalSaved, percentage, backgroundColor }) => {
  return (
    <div className="water-saved-card" style={{ backgroundColor }}>
      <div className="water-saved-card__content">
        <FaTint className="water-saved-card__icon" />
        <h3 className="water-saved-card__title">Water Saved</h3>
        <div className="water-saved-card__amount">{totalSaved}</div>
        <div className="water-saved-card__percentage">{percentage}</div>
      </div>
    </div>
  );
};

export default WaterSavedCard;
