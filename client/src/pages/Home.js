import React from 'react';
import { Segment, Image } from 'semantic-ui-react';

import GetStarted from '../components/GetStarted';
import eggs from '../images/calorieeggs.jpg';
import smoothie from '../images/smoothie.png';

const Home = () => {
    return (
        <Segment>
            <Image src={eggs} size='medium' floated='left' rounded/>
            <p>
                Welcome to Chewby, a calorie tracking application! With our user-friendly interface, you can easily track the calories you consume and burn throughout the day. Our app is designed to help you achieve your health and fitness goals by helping you keep track of the calories you eat throughout the day.
            </p>
            <Image src={smoothie} size='small' floated='right' rounded/>
            <p>
                To get started, simply create an account! From there, you can start logging your meals and exercises and track your progress over time.
            </p>
            <p>
                It's super quick and easy to log your meals, snacks, and drinks, and our app will then calculate the total number of calories you've consumed for the day. This feature allows you to stay accountable and make informed decisions about your diet, helping you to achieve your health and fitness goals. With our calorie counter application, you'll have all the tools you need to make informed decisions about your diet and achieve your fitness goals.
            </p>
            
            <GetStarted />
            
        </Segment>
    )
}


export default Home;
