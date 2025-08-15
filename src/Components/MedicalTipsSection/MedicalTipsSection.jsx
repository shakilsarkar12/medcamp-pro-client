import {
  FaHeartbeat,
  FaLungs,
  FaTemperatureHigh,
  FaStethoscope,
} from "react-icons/fa";
import { GiFruitBowl } from "react-icons/gi";
import { MdSanitizer } from "react-icons/md";
import HeadingTitle from "../../Shared/HeadingTitle";

const tips = [
  {
    icon: <FaHeartbeat className="text-3xl text-red-500" />,
    title: "Heart Health",
    tip: "Maintain a balanced diet, exercise regularly, and reduce stress to keep your heart strong.",
  },
  {
    icon: <GiFruitBowl className="text-3xl text-green-600" />,
    title: "Boost Immunity",
    tip: "Eat fruits and vegetables rich in vitamins C and D to strengthen your immune system.",
  },
  {
    icon: <FaLungs className="text-3xl text-blue-500" />,
    title: "Breathe Easy",
    tip: "Avoid smoking and stay away from polluted environments to keep your lungs healthy.",
  },
  {
    icon: <FaTemperatureHigh className="text-3xl text-orange-500" />,
    title: "Beat the Heat",
    tip: "Stay hydrated, avoid direct sunlight from 11 AM to 3 PM, and wear light clothes during summer.",
  },
  {
    icon: <MdSanitizer className="text-3xl text-purple-600" />,
    title: "Sanitization",
    tip: "Wash your hands frequently and sanitize surfaces to prevent infections and illness.",
  },
  {
    icon: <FaStethoscope className="text-3xl text-indigo-600" />,
    title: "Routine Checkups",
    tip: "Visit a doctor for routine health checkups even when you feel healthy — prevention is key.",
  },
];

const MedicalTipsSection = () => {
  return (
    <section className="pb-12">
      <div className="text-center">
        <HeadingTitle
          heading="Medical Tips"
          title="Stay informed with simple yet essential tips that can help you and
          your family live a healthier life."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tips.map((tip, idx) => (
            <div
              key={idx}
              className="bg-[#F7FAFC] border border-gray-200 p-4 md:p-6 rounded-lg shadow hover:shadow-lg transition"
            >
              <div className="flex items-center justify-center mb-4">
                {tip.icon}
              </div>
              <h4 className="text-xl font-semibold text-[#2D91EF] mb-2">
                {tip.title}
              </h4>
              <p className="text-sm text-gray-600">{tip.tip}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MedicalTipsSection;
