import { Form } from "react-bootstrap";

const AttributesFilterComponent = () => {
  return (
    <>
      {
        [
          { color: ['red', 'blue', 'gree,'] },
          {ram: ["1 TB", "2 TB"]}
        ].map((item, i) => (
          <div key={i} className='mb-3'>
            <Form.Label>{Object.keys(item)}
            </Form.Label>
            {
              item[Object.keys(item)].map((item, i) => (
                <Form.Check key={i}
                  type="checkbox"
                  id="default-checkbox"
                  label={item}
                />
              ))
            }
          </div>
        ))}

    </>
  );
};

export default AttributesFilterComponent;
