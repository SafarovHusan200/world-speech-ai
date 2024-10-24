import { useEffect, useState } from "react";

const AccordionFaq = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="accordion">
      {items.map((item, index) => (
        <div key={index} className="accordionItem">
          <div
            className={`accordionHeader`}
            onClick={() => toggleAccordion(index)}
          >
            {item.title}

            <div className="acc__icon">
              <svg
                style={{
                  transform: `rotate(${
                    activeIndex === index ? "45deg" : "0deg"
                  })`,
                }}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
              >
                <path
                  d="M4 12.8359H20"
                  stroke="#7B8A99"
                  strokeWidth="2" // Updated to camelCase
                  strokeLinecap="round" // Updated to camelCase
                  strokeLinejoin="round" // Updated to camelCase
                />
                <path
                  d="M12.0005 4.83496V20.835"
                  stroke="#7B8A99"
                  strokeWidth="2" // Updated to camelCase
                  strokeLinecap="round" // Updated to camelCase
                  strokeLinejoin="round" // Updated to camelCase
                />
              </svg>
            </div>
          </div>

          <div
            className={`accordionContent ${
              activeIndex === index ? "active" : ""
            }`}
          >
            {item.content}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AccordionFaq;
