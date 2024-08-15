import HyperMig from '@/assets/logo.png';

function ComingSoon() {
  return (
    <div className="container">
      <div className="row">
        <div>
          <div className="col-sm-12 d-flex flex-column align-items-center">
            <h1 className="mb-5">
              <img src={HyperMig} className="d-inline-block align-top mt-4" alt="HyperMig" />
            </h1>

            <h2 className="mb-5 text-info">Our Website Is Almost Ready..</h2>

            <h3>Time Left Untile Launching</h3>
          </div>

          <div className="col-sm-12 text-center">
            <div className="row">
              <div className="col-sm-offset-1 col-sm-10">
                <div className="timing">
                  <div
                    id="count-down"
                    data-date="2015-12-28 00:00:00"
                    data-tc-id="9320b0e5-d4a8-5e1a-ee72-aeb9f16805f2"
                  >
                    <div className="time_circles">
                      <canvas width="945" height="236"></canvas>

                      <div className="textDiv_Days" style={{ top: '83px', left: 0, width: '236.25px' }}>
                        <h4 style={{ fontSize: '17px', lineHeight: '17px' }}>Days</h4>
                        <span style={{ fontSize: '50px', lineHeight: '17px' }}>3152</span>
                      </div>

                      <div className="textDiv_Hours" style={{ top: '83px', left: 0, width: '236.25px' }}>
                        <h4 style={{ fontSize: '17px', lineHeight: '17px' }}>Hours</h4>
                        <span style={{ fontSize: '50px', lineHeight: '17px' }}>20</span>
                      </div>

                      <div className="textDiv_Minutes" style={{ top: '83px', left: '473px', width: '236.25px' }}>
                        <h4 style={{ fontSize: '17px', lineHeight: '17px' }}>Minutes</h4>
                        <span style={{ fontSize: '50px', lineHeight: '17px' }}>33</span>
                      </div>

                      <div className="textDiv_Seconds" style={{ top: '83px', left: '709px', width: '236.25px' }}>
                        <h4 style={{ fontSize: '17px', lineHeight: '17px' }}>Seconds</h4>
                        <span style={{ fontSize: '50px', lineHeight: '17px' }}>6</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-offset-2 col-sm-8">
                <form className="newsletter-signup" role="form">
                  <div className="input-group">
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Enter your email id"
                      required=""
                      name="EMAIL"
                    />

                    <span className="input-group-btn">
                      <input type="submit" className="btn btn-default btn-sand" value="subscribe" />
                    </span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComingSoon;
