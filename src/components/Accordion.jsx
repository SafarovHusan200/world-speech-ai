import { useState } from "react";

const Accordion = ({ allData, setSmartGPT }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);

    console.log(index);

    setSmartGPT(allData[index]);
  };

  return (
    <div className="accordion">
      {allData?.map((item, index) => (
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
                    activeIndex === index ? "0deg" : "180deg"
                  })`,
                }}
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="20"
                viewBox="0 0 12 20"
                fill="none"
              >
                <path
                  d="M0.999305 1.26611C0.741532 1.52396 0.596724 1.87363 0.596723 2.23823C0.596723 2.60283 0.741532 2.95251 0.999305 3.21036L7.80555 10.0166L0.999304 16.8229C0.748837 17.0822 0.610244 17.4295 0.613377 17.79C0.61651 18.1506 0.761117 18.4954 1.01605 18.7504C1.27099 19.0053 1.61586 19.1499 1.97638 19.153C2.3369 19.1562 2.68423 19.0176 2.94355 18.7671L10.7219 10.9887C10.9797 10.7309 11.1245 10.3812 11.1245 10.0166C11.1245 9.65201 10.9797 9.30233 10.7219 9.04448L2.94355 1.26611C2.6857 1.00833 2.33603 0.863525 1.97143 0.863525C1.60683 0.863525 1.25716 1.00833 0.999305 1.26611Z"
                  fill="#CCCCCC"
                />
              </svg>
            </div>
          </div>
          {/* <div
            className={`accordionContent ${
              activeIndex === index ? "active" : ""
            }`}
          >
            {item.content}
          </div> */}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
