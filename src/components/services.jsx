import React from "react";

export const Services = (props) => {
  const services = props.data || [];
  const columnsPerRow = 3; // Number of columns per row

  // Split services into rows of `columnsPerRow` items
  const rows = [];
  for (let i = 0; i < services.length; i += columnsPerRow) {
    rows.push(services.slice(i, i + columnsPerRow));
  }

  return (
    <div id="services" className="text-center">
      <div className="container">
        <div className="section-title">
          <h2>Our Services</h2>
          <p>
            Discover how we can help your business thrive with our range of IT services.
          </p>
        </div>
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((d, i) => (
              <div key={`${d.name}-${i}`} className="col-md-4">
                <div className="service-icon">
                  <img src={d.image} alt={d.name} style={{ width: "50px", height: "50px" }} />
                </div>
                <div className="service-desc">
                  <h3>{d.name}</h3>
                  <p>{d.text}</p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
