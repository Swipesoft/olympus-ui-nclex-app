//import { fetched_questions } from '@/lib/fetchers/fetch-items';

// links for the navigation bar
export const navLinks = [
    {
        id: "1",
        url:"#",
        label: "Home"
    },
    {
        id: "2",
        url:"/sign-in",
        label: "Clerk-sign-in"
    },
    {
        id: "3",
        url:"/sign-up",
        label: "Clerk-sign-up"
    },
    {
        id: "4",
        url:"/quiz",
        label: "NCLEX Q-bank"
    },
    {
        id: "5",
        url:"#",
        label: "Testimonial"
    },
    {
        id: "6",
        url:"#",
        label: "Contact"
    }
]

//export const nclexQuestions = fetched_questions; 
 
// model schema for NCLEX Questions (i.e API call returns)
export const nclexQuestions_old = [
  {
    id: 1,
    question: "A client with heart failure is prescribed digoxin. Which finding would indicate early signs of digoxin toxicity?",
    options: [
      "Bradycardia",
      "Hypertension",
      "Hyperkalemia",
      "Tachycardia"
    ],
    correctAnswer: 0,
    explanation: "Early signs of digoxin toxicity include bradycardia, nausea, vomiting, and visual disturbances."
  },
  {
    id: 2,
    question: "The nurse is caring for a client with a chest tube. Which assessment finding requires immediate intervention?",
    options: [
      "Continuous bubbling in the water seal chamber",
      "Fluctuation in the water seal chamber with respiration",
      "Drainage of 200mL in 8 hours",
      "Client reports pain at insertion site"
    ],
    correctAnswer: 0,
    explanation: "Continuous bubbling in the water seal chamber indicates an air leak and requires immediate intervention."
  },
  {
    id: 3,
    question: "A client with diabetes mellitus has a blood glucose level of 45 mg/dL. Which action should the nurse take first?",
    options: [
      "Give 15g of fast-acting carbohydrates",
      "Call the physician",
      "Check urine ketones",
      "Administer regular insulin"
    ],
    correctAnswer: 0,
    explanation: "For hypoglycemia (blood glucose <70 mg/dL), the priority is to give 15g of fast-acting carbohydrates."
  },
  {
    id: 4,
    question: "The nurse is preparing to administer heparin to a client. Which laboratory value should be monitored most closely?",
    options: [
      "PT/INR",
      "aPTT",
      "Platelet count",
      "Hemoglobin"
    ],
    correctAnswer: 1,
    explanation: "aPTT (activated partial thromboplastin time) is the primary lab value monitored for heparin therapy."
  },
  {
    id: 5,
    question: "A client is receiving morphine sulfate via PCA pump. Which assessment finding is most concerning?",
    options: [
      "Respiratory rate of 8 breaths/min",
      "Pain rating of 6/10",
      "Client reports nausea",
      "Urinary retention"
    ],
    correctAnswer: 0,
    explanation: "Respiratory depression is the most serious side effect of morphine. A rate of 8 breaths/min requires immediate intervention."
  }
]

export const nclexQuestions = [
  {
    id: 1,
    question: "A client with heart failure is prescribed digoxin. Which finding would indicate early signs of digoxin toxicity?",
    options: [
      "Bradycardia",
      "Hypertension",
      "Hyperkalemia",
      "Tachycardia"
    ],
    correctAnswer: [0],
    explanation: `
**✅ Bradycardia**  
Bradycardia is a classic early sign of digoxin toxicity due to its effect on increasing vagal tone and slowing down conduction through the AV node.

**❌ Hypertension**  
Digoxin does not typically cause high blood pressure. In fact, hypotension might be a concern in severe toxicity.

**❌ Hyperkalemia**  
Hyperkalemia can occur in severe toxicity (especially if there's renal failure), but it's not an early sign. Hypokalemia is a greater risk because it enhances digoxin's toxic effects.

**❌ Tachycardia**  
Digoxin tends to slow the heart rate. Tachyarrhythmias can appear in toxicity, but usually in later stages or as a result of ectopic beats.
`
  },
  {
    id: 2,
    question: "The nurse is caring for a client with a chest tube. Which assessment finding requires immediate intervention?",
    options: [
      "Continuous bubbling in the water seal chamber",
      "Fluctuation in the water seal chamber with respiration",
      "Drainage of 200mL in 8 hours",
      "Client reports pain at insertion site"
    ],
    correctAnswer: [0],
    explanation: `
**✅ Continuous bubbling in the water seal chamber**  
This indicates an **air leak** in the system, which could lead to pneumothorax or compromise lung expansion. Needs prompt investigation.

**❌ Fluctuation in the water seal chamber with respiration**  
This is **normal** and expected—it reflects changes in intrathoracic pressure as the client breathes.

**❌ Drainage of 200mL in 8 hours**  
This amount is within normal range. Alarming values are usually **>100mL/hour**, especially if sudden or fresh blood is observed.

**❌ Client reports pain at insertion site**  
Mild discomfort is expected, though it should still be monitored. It does not require immediate intervention unless signs of infection appear.
`
  },
  {
    id: 3,
    question: "A client with diabetes mellitus has a blood glucose level of 45 mg/dL. Which action should the nurse take first?",
    options: [
      "Give 15g of fast-acting carbohydrates",
      "Call the physician",
      "Check urine ketones",
      "Administer regular insulin"
    ],
    correctAnswer: [0],
    explanation: `
**✅ Give 15g of fast-acting carbohydrates**  
This is the **first-line emergency treatment** for hypoglycemia. Glucose <70 mg/dL is considered low; <50 mg/dL is critical.

**❌ Call the physician**  
While eventually necessary if symptoms worsen, treatment should never be delayed. This is **not the first action**.

**❌ Check urine ketones**  
This is relevant for **hyperglycemia**, especially in diabetic ketoacidosis. Not appropriate during hypoglycemia.

**❌ Administer regular insulin**  
This would dangerously **worsen hypoglycemia**. Insulin is contraindicated in this situation.
`
  },
  {
    id: 4,
    question: "The nurse is preparing to administer heparin to a client. Which laboratory value should be monitored most closely?",
    options: [
      "PT/INR",
      "aPTT",
      "Platelet count",
      "Hemoglobin"
    ],
    correctAnswer: [1],
    explanation: `
**✅ aPTT**  
Heparin prolongs the **activated partial thromboplastin time**, so monitoring aPTT is critical to ensure therapeutic anticoagulation.

**❌ PT/INR**  
This is relevant for **warfarin**, not heparin. Mixing up these labs can lead to improper dosing.

**❌ Platelet count**  
It’s important to monitor for **heparin-induced thrombocytopenia**, but it’s not the primary measure for dosing.

**❌ Hemoglobin**  
Hemoglobin monitoring is useful for assessing bleeding, but it’s **not specific** to heparin effect.
`
  },
  {
    id: 5,
    question: "A client is receiving morphine sulfate via PCA pump. Which assessment finding is most concerning?",
    options: [
      "Respiratory rate of 8 breaths/min",
      "Pain rating of 6/10",
      "Client reports nausea",
      "Urinary retention"
    ],
    correctAnswer: [0,3],
    explanation: `
**✅ Respiratory rate of 8 breaths/min**  
Morphine can cause **respiratory depression**, especially at high doses. Rates <10/min are considered critical and require **immediate action**.

**❌ Pain rating of 6/10**  
While pain management is essential, a moderate pain score doesn’t require urgent intervention unless persistent.

**❌ Client reports nausea**  
Common side effect of opioids, but not life-threatening. Can be managed with antiemetics.

**❌ Urinary retention**  
Again, a known side effect of morphine, but not immediately dangerous.
`
  }
];
