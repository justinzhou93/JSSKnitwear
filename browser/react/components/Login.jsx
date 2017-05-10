import React from 'react';
import { connect } from 'react-redux';
import { localLogin } from '../action-creators/auth';

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.loginSubmit = this.loginSubmit.bind(this);
    }

    loginSubmit(evt) {
        evt.preventDefault();
        const credentials = {
            username: evt.target.email.value,
            password: evt.target.password.value
        };
        this.props.localLogin(credentials);
    }

    render() {
        return (
            <div className="content">
                <div className="header">
                    <h4 className="title" style={{fontWeight: 'bold'}}>Log in</h4>
                </div>
                <form onSubmit={this.loginSubmit} role="form">
                    <div className="form-group">
                        <div className="input-group">
                            <input type="text" name="email" className="form-control" id="uLogin" placeholder="Email" />
                            <label htmlFor="uLogin" className="input-group-addon glyphicon glyphicon-envelope" />
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="input-group">
                            <input type="password" name="password" className="form-control" id="uPassword" placeholder="Password" />
                            <label htmlFor="uPassword" className="input-group-addon glyphicon glyphicon-lock" />
                        </div>
                    </div>

                    <div className="submit">
                        <button type="submit" className="btn btn-default" style={{borderRadius: '4px'}}>Login</button>
                    </div>

                </form>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        localLogin: (credentials) => dispatch(localLogin(credentials))
    }
};

export default connect(null, mapDispatchToProps)(Login);
