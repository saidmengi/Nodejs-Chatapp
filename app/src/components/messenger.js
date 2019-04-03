import React,{Component} from 'react';
import classNames from 'classnames';
import avatar from '../images/blank_avatar.jpg';

export default class Messenger extends Component{

    constructor(props){
        super(props);
        this.state= {
            height: window.innerHeight,
            messages: [],
        }

        this._onResize = this._onResize.bind(this);
        this.addTestMessages = this.addTestMessages.bind(this);
    }

    _onResize(){
        this.setState({
            height: window.innerHeight
        });
    }
    componentDidMount(){

        
        window.addEventListener('resize', this._onResize);
        this.addTestMessages();
    }

    addTestMessages(){
        let {messages} = this.state;

        for(let i = 0; i<100; i++){

            let isMe = false;

            if(i%3 ===0){
                isMe = true;
            }

            const newMsg = {
                author:`Author ${i}`,
                body:`The body of message ${i}`,
                avatar: avatar,
                me: isMe,
            }
            messages.push(newMsg);
        }

        this.setState({messages: messages});
    }

    componentWillUnmount(){
        
        window.removeEventListener('resize', this._onResize);
    }

    render(){

        const {height, messages} =this.state;

        const style ={
            height: height,
        }
        console.log(messages);

        return <div style={style} className="app-messenger">
            <div className="header">
            
                <div className="left">
                    <div className="actions">
                        <button>new message</button>
                    </div>
                </div>
                <div className="content"><h2>Title</h2></div>
                <div className="right">
                
                    <div className="user-bar">
                        <div className="profile-name">Said Mengi</div>
                        <div className="profile-image"><img src={avatar} alt="" /></div>
                    </div>

                </div>
            </div>
            <div className="main">
                <div className="sidebar-left">
                    <div className="chanels">
                        <div className="chanel">
                            <div className="user-image">
                                <img src={avatar} alt="" />
                            </div>
                            <div className="chanel-info">
                                <h2>Kanal Başlığı</h2>
                                <p>Merhabalar...</p>
                            </div>
                            
                        </div>

                        <div className="chanel">
                            <div className="user-image">
                                <img src={avatar} alt="" />
                            </div>
                            <div className="chanel-info">
                                <h2>Kanal Başlığı</h2>
                                <p>Merhabalar...</p>
                            </div>
                            
                        </div>
                    </div>
                </div>
                <div className="content">
                    <div className="messages">

                        {messages.map((message, index) =>{

                            return (
                                <div key={index} className={classNames('message', {'me': message.me})}>
                            <div className="message-user-image">
                                <img src={message.avatar} alt="" />    
                            </div>
                            <div className="message-body">
                                <div className="message-author">{message.me ? 'You' : message.author} Says:</div>
                                <div className="message-text">
                                    <p>{message.body}</p>
                                </div>
                            </div>
                        </div>

                            )
                        })}
                        
                
                         
                    </div>
                    <div className="messenger-input">
                    
                        <div className="text-input">
                            <textarea placeholder="Mesajınızı yazınız..." />
                        </div>
                        <div className="actions">
                            <button className="send">Gönder</button>
                        </div>

                    </div>
                </div>
                <div className="sidebar-right">
                    <h2 className="title">Kullanıcılar</h2>
                    <div className="members">
                        <div className="member">
                            <div className="user-image">
                                <img src={avatar} alt="" />
                            </div>
                            <div className="member-info">
                                <h2>Ali dayı</h2>
                                <p>Katıldı: 3 gün önce.</p>
                            </div>
                        </div>

                        <div className="member">
                            <div className="user-image">
                                <img src={avatar} alt="" />
                            </div>
                            <div className="member-info">
                                <h2>Muhtar</h2>
                                <p>Katıldı: 5 gün önce.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        
        </div>
    }
}