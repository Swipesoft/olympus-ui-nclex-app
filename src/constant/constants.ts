// links for the navigation bar
export const navLinks = [
    {
        id: "1",
        url:"#",
        label: "Home"
    },
    {
        id: "2",
        url:"#",
        label: "About"
    },
    {
        id: "3",
        url:"#",
        label: "Feature"
    },
    {
        id: "4",
        url:"#",
        label: "Price"
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

// model schema for NCLEX Questions (i.e API call returns)
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