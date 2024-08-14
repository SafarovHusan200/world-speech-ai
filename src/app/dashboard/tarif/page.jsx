import TarifCard from "@/components/TarifCard";
import React from "react";
import "../../../styles/dashboard-tarif.css";

const Tarif = () => {
  return (
    <div className="dashboard__tarif">
      <div className="section-title">Тарифы</div>

      <div className="section-actions">
        <div className="monthly">Ежемесячно</div>
        <input type="checkbox" name="monthly" id="monthly" />
        <label htmlFor="monthly" className="monthly__label">
          <span></span>
        </label>
        <div className="annual">Годовая</div>
        <span>-15%</span>
      </div>

      <TarifCard />
    </div>
  );
};

export default Tarif;
