// src/components/WaterUsedCard.jsx
import React from "react";
import "./WaterUsedCard.css";
import { FaTint } from "react-icons/fa";

const WaterUsedCard = ({ totalUsed, percentage, backgroundColor }) => {
  return (
    <div className="water-used-card" style={{ backgroundColor }}>
      <div className="water-used-card__content">
        <FaTint className="water-used-card__icon" />
        <h3 className="water-used-card__title">Water Used</h3>
        <div className="water-used-card__amount">{totalUsed}</div>
        <div className="water-used-card__percentage">{percentage}</div>
      </div>
    </div>
  );
};

export default WaterUsedCard;
