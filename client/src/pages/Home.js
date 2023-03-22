import React from 'react';
import { Segment, Image, Button, Icon } from 'semantic-ui-react';
import eggs from '../images/calorieeggs.jpg';
import smoothie from '../images/smoothie.png';

const Home = () => {
    return (
        <Segment>
            <Image src={eggs} size='medium' floated='left' />
            <p>
                Welcome to our calorie counter application! With our user-friendly interface, you can easily track the calories you consume and burn throughout the day. Our app is designed to help you achieve your health and fitness goals by providing accurate information on the nutritional value of the foods you eat.
            </p>
            <Image src={smoothie} size='small' floated='right' />
            <p>
                To get started, simply create an account! From there, you can start logging your meals and exercises and track your progress over time.
            </p>
            <p>
                It's super quick and easy to log your meals, snacks, and drinks, and our app will then calculate the total number of calories you've consumed for the day. This feature allows you to stay accountable and make informed decisions about your diet, helping you to achieve your health and fitness goals. With our calorie counter application, you'll have all the tools you need to make informed decisions about your diet and achieve your fitness goals.
            </p>
            <div>
                <Button animated size='massive'>
                    <Button.Content visible>Sign Up!</Button.Content>
                    <Button.Content hidden>
                        <Icon name='hand point up outline' />
                    </Button.Content>
                </Button>
            </div>
        </Segment>
    )
}


export default Home;
