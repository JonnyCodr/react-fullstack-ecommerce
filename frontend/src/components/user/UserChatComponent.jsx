import '../../chats.css';

const UserChatComponent = () => {
  return (
    <>
      <input type="checkbox" id='check'/>
      <label htmlFor="check" className='chat-btn'>
        <i className="bi bi-chat-dots comment"></i>
        <span className="position-absolute top-0 start-10 translate-middle p-2 bg-danger border border-light rounded-circle"></span>
        <i className="bi bi-x-circle close"></i>
      </label>
      <div className='chat-wrapper'>
        <div className="chat-header">
          <h6>Let's Chat - Online</h6>
        </div>
        <div className="chat-form">
          <div className="chat-msg">
            <p>
              <b>You wrote:</b>Sup... where's my package?
            </p>
            <p className='bg-primary p-3 ms-4 text-light rounded-pill'><b>Support wrote:</b>Bro, do you even order?</p>
          </div>
          <textarea name="chatMessage" id="clientChatMsg" cols="20" rows="2" className="form-control" placeholder='Your Text Message'></textarea>
          <button className="btn btn-success btn-blocl">Submit</button>
        </div>
      </div>
    </>
  );
};

export default UserChatComponent;
