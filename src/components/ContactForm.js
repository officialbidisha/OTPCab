import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
const config = {
  formUrl: "https://docs.google.com/forms/d/1XFjRIBI0jFPRJ7ZknAH-uZKpZsXzACWIplO12axhaDE/formResponse",
  cors: 'https://cors-anywhere.herokuapp.com/',
};

const Input = ({ name, label, doChange, type = "text" }) => {
  return (
    <label htmlFor={name} className="form-label">
      {label}
      <input type={type} id={name} name={name} onChange={doChange} />
    </label>
  );
};

const ContactForm = () => {
  /**
    I think this way to organize the 'inputs' is more clearest.
    The 'id' property is the input field in your google form,
    for example the 'name' field, if you inpect your Google form this should looks like 'entry.2005620554'
    */
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [phone, setPhone] = useState(null);
   const [message,setMessage] = useState("");

  const doSubmit = async (e) => {
    e.preventDefault();

    
    const formData = new FormData();
    // create a uuid for evenry new response;
    let id = uuidv4();
    formData.append(`entry.${2095484083}`, name);
    formData.append(id, email);
    formData.append(id, phone);
    formData.append(id,message);
    // _.map(inputs, (item) => {
    //   formData.append(`entry.${item.id}`, item.value);
    // });

    await axios({
        url:`${config.cors}${config.formUrl}`,
        method: "post",
        data: formData,
        responseType: "json",
      }
    )
      .then((response) => {
        console.log("response", response);
        console.log(response);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const handleNameChange = (e) => {
     const {value} = e.target;
     setName(value);
  }

  const handleMailChange = e => {
    const {value} = e.target;
    setEmail(value);
  }

  const handleMessageChange = e => {
    const {value} = e.target;
    setMessage(value);
  }

  const handlePhoneChange = e => {
    const {value} = e.target;
    setPhone(value);
  }

  return (
    <form name="contact-form" onSubmit={doSubmit}>
      <fieldset>
        <legend>Contact Form</legend>

        <Input name="name" label="Name" doChange={handleNameChange} />
        <Input
          name="email"
          label="Email"
          doChange={handleMailChange}
          type="email"
        />
        <Input name="phone" label="Phone number" doChange={handlePhoneChange} />

        <label htmlFor="message" className="form-label">
          Message
          <textarea id="message" name="message" onChange={handleMessageChange} />
        </label>

        <p>
          <button className="btn">Send message</button>
        </p>
      </fieldset>
    </form>
  );
};

export default ContactForm;
