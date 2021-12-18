import React, { Component } from "react";
import { 
    Route,
    Routes,
    NavLink,
    HashRouter 
} 
from "react-router-dom";
import Dracula from "./Dracula";
import Ivan from "./Ivan";
import Dying from "./Dying";

class Main extends Component {
    constructor (props) {
        super (props);
        this.state = {
            alert: 'Begin Typing To Start The Clock.',
            userInput: '',
            wpm: 0.0,
            typingStarted: false          
        };
        //grabs text and word count
        this.page1Text='Oh, the terrible struggle that I have had against sleep so often of late; the pain of the sleeplessness, or the pain of the fear of sleep, and with such unknown horror as it has for me! How blessed are some people, whose lives have no fears, no dreads; to whom sleep is a blessing that comes nightly, and brings nothing but sweet dreams.';
        this.page1WordCount= 64;
        this.page2Text='In reality it was just what is usually seen in the houses of people of moderate means who want to appear rich, and therefore succeed only in resembling otherslike themselves: there are damasks, dark wood, plants, rugs, and dull and polished bronzes -- all the things people of a certain class have in order to resemble other people of that class. His house was so like the others that it would never have been noticed, but to him it all seemed to be quite exceptional.';
        this.page2WordCount= 84;
        this.page3Text='In a strange room you must empty yourself for sleep. And before you are emptied for sleep, what are you. And when you are emptied for sleep, you are not. And when you are filled with sleep, you never were. I dont know what I am. I dont know if I am or not. Jewel knows he is, because he does not know that he does not know whether he is or not. He cannot empty himself for sleep because he is not what he is and he is what he is not. Beyond the unlamped wall I can hear the rain shaping the wagon that is ours, the load that is no longer theirs that felled and sawed it nor yet theirs that bought it and which is not ours either, lie on our wagon though it does, since only the wind and the rain shape it only to Jewel and me, that are not asleep. And since sleep is is-not and rain and wind are was, it is not. Yet the wagon is, because when the wagon is was, Addie Bundren will not be. And Jewel is, so Addie Bundren must be. And then I must be, or I could not empty myself for sleep in a strange room. And so if I am not emptied yet, I am is.';
        this.page3WordCount= 222;
        this.getText = this.getText.bind(this);
        this.timerTick = this.timerTick.bind(this);
    }

    //checking if input matches and caclulating wpm if correct
    timerTick() {
        console.log(window.location.href);
        if ( window.location.href.endsWith('#/') ) {
            this.matchedText = this.page1Text;
            this.numWords = this.page1WordCount;
        }
        if ( window.location.href.endsWith('#/Ivan') ) {
            this.matchedText = this.page2Text;
            this.numWords = this.page2WordCount;
        }
        if ( window.location.href.endsWith('#/Dying') ) {
            this.matchedText = this.page3Text;
            this.numWords = this.page3WordCount;
        }
        if ( this.state.userInput === this.matchedText )
        {
            this.setState({
                alert: 'Input Matches Text'
            });
            clearInterval(this.typingTimer);
            this.setState({
                wpm: (Math.round( ( ( this.numWords / this.props.countValue ) * 60.0 ) * 10) / 10)
            });
        }
        else
        {
            this.setState({
                alert: 'Input Does Not Match'
            });
        }
        this.props.increaseCount();
    }

    getText(e) {
        if ( this.state.typingStarted === false) {
            this.typingTimer = setInterval(this.timerTick, 1000);
            this.setState({
                typingStarted: true
            });
            this.setState({
                alert: 'Typing...'
            });
        }

        this.setState ({
                userInput:e.target.value
        });
    }

    //component things
    shouldComponentUpdate(newProps, newState) {
            console.log("shouldComponentUpdate: Should component update?")
            return true;
    }
    componentDidUpdate(currentProps, currentState) {
            console.log("componentDidUpdate: Component just updated!");
    }
    componentDidMount() {
    }
    componentWillUnmount() {
        clearInterval(this.typingTimer);
    }
   
    render() {
        var self = this;
        return (
            <HashRouter>
            <div>
                <h1>Literature Typing Tutor</h1>
                <h2>Choose A Quote From A Famous Literary Work</h2>
                <ul className="header">
                    <li><NavLink exact="true" to="/">Quote One</NavLink></li>
                    <li><NavLink to="/Ivan">Quote Two</NavLink></li>
                    <li><NavLink to="/Dying">Quote Three</NavLink></li>
                </ul>
                <div className="content">
                    <Routes>
                    <Route exact path="/" element={<Dracula matchString={this.page1Text} />}/>
                    <Route path="/Ivan" element={<Ivan matchString={this.page2Text} />}/>
                    <Route path="/Dying" element={<Dying matchString={this.page3Text} />}/>
                    </Routes>
                </div>
            </div>
            
            <form>
            <textarea name="ttarea" onChange={this.getText}
            ref={
                function(el){
                    self._input = el;
                }
            }
            //time and speed
            placeholder="Begin Typing Here..." rows="6" cols="163" required="required">
            </textarea>
            </form>
            <h2 className="message">{this.state.alert}</h2>
            <h2 className="center">Time: {this.props.countValue}</h2>
            <h2 className="center">Typing Speed: {this.state.wpm}  words per minute</h2>
            </HashRouter>
        );
    }
}
export default Main;