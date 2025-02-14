const painAssessment: {
  quality: IFocusAndQuestion;
  severity: IFocusAndQuestion;
  timing: IFocusAndQuestion;
  duration: IFocusAndQuestion;
  associatedSymptoms: IFocusAndQuestion;
  exacerbatingOrRelievingFactor: IFocusAndQuestion;
  pastMedicalHistory: IFocusAndQuestion;
  medicationAndAllergyHistory: IFocusAndQuestion;
  riskFactors: IFocusAndQuestion;
  lifeStyleAndSocialHistory: IFocusAndQuestion;
} = {
  quality: {
    focus: "Quality",
    question: "How would you describe the pain? Is it sharp, throbbing, burning, or something else?",
    suggestions: [
      "It's a throbbing pain, like a heartbeat in my head.",
      "It's a constant, dull throb, sometimes turning into a sharper pain.",
      "A sharp, shooting pain down my leg.",
    ],
  },
  severity: {
    focus: "Severity",
    question: "On a scale from 1 to 10, how bad is the pain during these episodes?",
    suggestions: [
      "When it happens, it's a 9, almost unbearable.",
      "On a scale of 1 to 10, it usually hovers around a 4, but can spike up to a 7 when I move suddenly.",
      "On a scale from 1 to 10, it's usually around a 6, but it can spike to an 8.",
    ],
  },
  timing: {
    focus: "Timing",
    question: "When does the pain happen most? Is it constant or does it come and go? Any specific time of day it's worse?",
    suggestions: [
      "It tends to start in the mid-afternoon and can last for several hours.",
      "The pain is persistent throughout the day but gets worse in the evening after work.",
      "It's intermittent, more noticeable in the morning.",
    ],
  },
  duration: {
    focus: "Duration",
    question: "When did the pain start, and has it been there all the time or does it come and go? How long has this been happening?",
    suggestions: [
      "It started suddenly this morning.",
      "This has been going on for about three months now.",
      "I've been experiencing these headaches 3-4 times a week for the past two months.",
    ],
  },
  associatedSymptoms: {
    focus: "Associated Symptoms",
    question: "Do you feel anything else with the pain, like tingling or numbness? If yes, where and when does that happen?",
    suggestions: [
      "I become extremely sensitive to light and sound during these episodes. Sometimes I also feel nauseous.",
      "I've noticed some stiffness in the mornings, and my back feels weak.",
      "There's also tingling and numbness in my fingers.",
    ],
  },
  exacerbatingOrRelievingFactor: {
    focus: "Exacerbating or Relieving Factors",
    question: "Have you noticed anything that makes the pain worse or better? Any activities, positions, or treatments that affect it?",
    suggestions: [
      "Eating often makes the abdominal pain worse.",
      "Rest seems to help a bit, but long periods of sitting or standing make it worse. Heat pads provide temporary relief.",
      "",
    ],
  },
  pastMedicalHistory: {
    focus: "Past Medical History",
    question: "Do you have any significant past health issues or surgeries that might be related to this pain?",
    suggestions: [
      "I have a history of migraines, but these headaches feel different.",
      "I had a slipped disc about five years ago. No other major health issues.",
      "No significant medical history, just the usual colds and flu.",
    ],
  },
  medicationAndAllergyHistory: {
    focus: "Medication and Allergy History",
    question: "What do you use for pain relief, and are you allergic to any medications?",
    suggestions: [
      "I use over-the-counter pain relievers, but they don't help much.",
      "I occasionally take ibuprofen. No known allergies.",
      "I've tried over-the-counter painkillers like ibuprofen and acetaminophen, but they only help a little. No known drug allergies.",
    ],
  },
  riskFactors: {
    focus: "Risk Factors",
    question: "Do you have any habits, like smoking, that might be linked to your pain?",
    suggestions: [
      "There's a family history of migraines. I've also been under a lot of stress at work.",
      "I've had a mostly sedentary lifestyle. I'm also overweight, which I've heard can contribute to back problems.",
      "I've been a smoker for 20 years.",
    ],
  },
  lifeStyleAndSocialHistory: {
    focus: "Lifestyle and Social History",
    question: "Can you describe your daily routine and work environment? Any habits or activities that could be connected to your pain?",
    suggestions: [
      "I work long hours at a desk job, so I'm mostly sedentary.",
      "I'm an accountant, so I spend most of the day sitting. I don't get much exercise, and my diet isn't the best.",
      "I'm a graphic designer, so I spend a lot of time staring at computer screens. My sleep schedule has been irregular lately.",
    ],
  },
};

interface IFocusAndQuestion {
  focus: string;
  question: string;
  suggestions: string[];
}

export default painAssessment;
