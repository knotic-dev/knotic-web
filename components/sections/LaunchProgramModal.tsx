"use client";

import { useState } from "react";

interface LaunchProgramModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LaunchProgramModal({ isOpen, onClose }: LaunchProgramModalProps) {
  const [step, setStep] = useState(1);
  const [emailError, setEmailError] = useState("");

  const [formData, setFormData] = useState({
    objective: "",
    targetReach: "National (India)",
    budgetRange: "Mid Tier",
    companyName: "",
    website: "",
    workEmail: "",
    techStack: "",
    contactNumber: "",
    personalEmail: "",
  });

  if (!isOpen) return null;

  const handleObjectiveSelect = (obj: string) => {
    setFormData({ ...formData, objective: obj });
    setStep(2); 
  };

  const validateAndNext = () => {
    if (step === 3) {
      const email = formData.workEmail.trim().toLowerCase();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
      if (!emailRegex.test(email)) {
        setEmailError("Please enter a valid email address.");
        return;
      }
      if (
        email.endsWith("@gmail.com") || 
        email.endsWith("@yahoo.com") || 
        email.endsWith("@outlook.com") || 
        email.endsWith("@hotmail.com")
      ) {
        setEmailError("Please use your official company work email.");
        return;
      }
      setEmailError("");
    }
    setStep((prev) => prev + 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Program Config Completed:", formData);
    alert("Brief Initialized Successfully!");
    onClose();
    setStep(1);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
      onClick={onClose}
    >
      <style dangerouslySetInnerHTML={{__html: `
        .config-toggle-btn {
          background: var(--bg-primary, rgba(255,255,255,0.02));
          border: 1px solid var(--border-color);
          color: var(--text-primary);
          transition: all 0.2s ease;
        }
        .config-toggle-btn.active {
          border-color: var(--accent-cyan, #00f0ff) !important;
          background: rgba(0, 240, 255, 0.08) !important;
          color: var(--text-primary) !important;
        }
        .config-toggle-btn:hover:not(.active) {
          border-color: #A855F7;
        }
        .config-input {
          width: 100%;
          padding: 12px 16px;
          border-radius: 8px;
          background: var(--bg-secondary, rgba(0,0,0,0.02));
          border: 1px solid var(--border-color);
          color: var(--text-primary);
          outline: none;
          transition: border-color 0.2s ease;
        }
        .config-input:focus {
          border-color: #A855F7 !important;
        }
      `}} />

      <div
        style={{
          width: "100%",
          maxWidth: "540px",
          minHeight: "460px", // Standardizes structural volume baseline across views
          backgroundColor: "var(--bg-secondary, rgba(15, 23, 42, 0.8))",
          border: "1px solid var(--border-color)",
          borderRadius: "16px",
          padding: "40px",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
          position: "relative",
          display: "flex",
          flexDirection: "column",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "24px",
            right: "24px",
            background: "none",
            border: "none",
            color: "var(--text-secondary)",
            cursor: "pointer",
            fontSize: "18px",
            zIndex: 10,
          }}
        >
          ✕
        </button>

        {/* Stepper Status Line */}
        <div style={{ display: "flex", gap: "6px", marginBottom: "32px" }}>
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              style={{
                flexGrow: 1,
                height: "3px",
                borderRadius: "99px",
                backgroundColor: s <= step ? "#A855F7" : "var(--border-color)",
                transition: "background-color 0.3s ease",
              }}
            />
          ))}
        </div>

        <form 
          onSubmit={handleSubmit} 
          style={{ display: "flex", flexDirection: "column", flexGrow: 1, justifyContent: "space-between" }}
        >
          {/* STEP 1: OBJECTIVE */}
          {step === 1 && (
            <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
              <h3 style={{ fontSize: "20px", fontWeight: 700, margin: "0 0 8px 0", color: "var(--text-primary)" }}>
                Select Primary Objective
              </h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", margin: "0 0 24px 0" }}>
                Identify the baseline target deployment vector for your system framework.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {[
                  "Host a Custom Hackathon",
                  "Dev-Rel & Developer Tool Adoption",
                  "Technical Talent Sourcing & Hiring",
                  "Mentorship or Incubator Pipeline",
                ].map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => handleObjectiveSelect(item)}
                    className={`config-toggle-btn ${formData.objective === item ? "active" : ""}`}
                    style={{ padding: "14px 16px", borderRadius: "10px", fontWeight: "600", textAlign: "left", cursor: "pointer" }}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: MATRIX SCALE & BUDGET */}
          {step === 2 && (
            <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
              <h3 style={{ fontSize: "20px", fontWeight: 700, margin: "0 0 24px 0", color: "var(--text-primary)" }}>
                Scale & Operational Scope
              </h3>

              <div style={{ marginBottom: "24px" }}>
                <label style={{ display: "block", fontSize: "12px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 0 12px 0", color: "var(--text-secondary)" }}>
                  Target Reach
                </label>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
                  {["Local (Delhi/NCR)", "National (India)", "Global (Multi-Country)"].map((reach) => (
                    <button
                      key={reach}
                      type="button"
                      onClick={() => setFormData({ ...formData, targetReach: reach })}
                      className={`config-toggle-btn ${formData.targetReach === reach ? "active" : ""}`}
                      style={{ padding: "12px 8px", borderRadius: "8px", fontSize: "11px", fontWeight: "600", cursor: "pointer" }}
                    >
                      {reach.split(" ")[0]}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: "24px" }}>
                <label style={{ display: "block", fontSize: "12px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 0 12px 0", color: "var(--text-secondary)" }}>
                  Estimated Program Budget
                </label>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
                  {["Seed Tier", "Mid Tier", "Enterprise Allocation"].map((tier) => (
                    <button
                      key={tier}
                      type="button"
                      onClick={() => setFormData({ ...formData, budgetRange: tier })}
                      className={`config-toggle-btn ${formData.budgetRange === tier ? "active" : ""}`}
                      style={{ padding: "12px 8px", borderRadius: "8px", fontSize: "11px", fontWeight: "600", cursor: "pointer" }}
                    >
                      {tier}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Layout Alignment Buffer */}
              <div style={{ flexGrow: 1 }} />

              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "auto" }}>
                <button type="button" onClick={() => setStep(1)} style={{ background: "none", border: "none", color: "var(--text-secondary)", cursor: "pointer", fontSize: "14px" }}>← Back</button>
                <button type="button" onClick={() => setStep(3)} style={{ backgroundColor: "var(--text-primary)", color: "var(--bg-primary)", padding: "10px 24px", borderRadius: "6px", fontWeight: "600", border: "none", cursor: "pointer" }}>Continue</button>
              </div>
            </div>
          )}

          {/* STEP 3: COMPANY PROFILING */}
          {step === 3 && (
            <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
              <h3 style={{ fontSize: "20px", fontWeight: 700, margin: "0 0 24px 0", color: "var(--text-primary)" }}>
                Corporate Identity Profiling
              </h3>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <input
                    required
                    type="text"
                    placeholder="Company Name"
                    className="config-input"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  />
                  <input
                    required
                    type="url"
                    placeholder="Website URL"
                    className="config-input"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  />
                </div>

                <div style={{ minHeight: "68px" }}>
                  <input
                    required
                    type="email"
                    placeholder="Official Corporate Work Email"
                    className="config-input"
                    value={formData.workEmail}
                    onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                  />
                  {emailError && (
                    <p style={{ color: "#EF4444", fontSize: "12px", margin: "6px 0 0 0" }}>
                      {emailError}
                    </p>
                  )}
                </div>
              </div>

              {/* Layout Alignment Buffer */}
              <div style={{ flexGrow: 1 }} />

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto" }}>
                <button type="button" onClick={() => setStep(2)} style={{ background: "none", border: "none", color: "var(--text-secondary)", cursor: "pointer", fontSize: "14px" }}>← Back</button>
                <button
                  type="button"
                  onClick={validateAndNext}
                  disabled={!formData.companyName || !formData.website || !formData.workEmail}
                  style={{
                    backgroundColor: "var(--text-primary)",
                    color: "var(--bg-primary)",
                    padding: "10px 24px",
                    borderRadius: "6px",
                    fontWeight: "600",
                    border: "none",
                    cursor: "pointer",
                    opacity: (!formData.companyName || !formData.website || !formData.workEmail) ? 0.5 : 1,
                  }}
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: TECH DETAILS & POINT OF CONTACT INFORMATION */}
          {step === 4 && (
            <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
              <h3 style={{ fontSize: "20px", fontWeight: 700, margin: "0 0 8px 0", color: "var(--text-primary)" }}>
                Technical & Contact Overview
              </h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", margin: "0 0 20px 0" }}>
                Provide final details to complete your strategy runway profile.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <input
                    required
                    type="tel"
                    placeholder="Contact Number"
                    className="config-input"
                    value={formData.contactNumber}
                    onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                  />
                  <input
                    required
                    type="email"
                    placeholder="Personal Email ID"
                    className="config-input"
                    value={formData.personalEmail}
                    onChange={(e) => setFormData({ ...formData, personalEmail: e.target.value })}
                  />
                </div>

                <textarea
                  required
                  rows={3}
                  placeholder="What API, SDK, or Core Tech Stack do you want developers to build with? (e.g., Agora RTC Engine, OpenAI Realtime API...)"
                  className="config-input"
                  style={{ resize: "none", fontFamily: "inherit" }}
                  value={formData.techStack}
                  onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                />
              </div>

              {/* Layout Alignment Buffer */}
              <div style={{ flexGrow: 1 }} />

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto" }}>
                <button type="button" onClick={() => setStep(3)} style={{ background: "none", border: "none", color: "var(--text-secondary)", cursor: "pointer", fontSize: "14px" }}>← Back</button>
                <button
                  type="submit"
                  disabled={!formData.techStack || !formData.contactNumber || !formData.personalEmail}
                  style={{
                    backgroundColor: "#A855F7",
                    color: "#ffffff",
                    padding: "12px 28px",
                    borderRadius: "8px",
                    fontWeight: "700",
                    border: "none",
                    cursor: "pointer",
                    boxShadow: "0 0 20px rgba(168, 85, 247, 0.4)",
                    opacity: (!formData.techStack || !formData.contactNumber || !formData.personalEmail) ? 0.5 : 1,
                  }}
                >
                  Initialize Program Brief →
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}