import React from 'react';
import { Button, Icon } from 'semantic-ui-react';

export const ButtonAnimatedLeft = (props) => {
    return (
        <div>
            <Button animated>
                <Button.Content visible>
                    <Icon name='arrow left' />
                </Button.Content>
                <Button.Content hidden onClick={props.handlePrev}>{props.prev}</Button.Content>
            </Button>
        </div>
    )
}

export const ButtonAnimatedRight = (props) => {
    return (
        <div>
            <Button animated>
                <Button.Content visible>
                    <Icon name='arrow right' />
                </Button.Content>
                <Button.Content hidden onClick={props.handleNext}>{props.next}</Button.Content>
            </Button>
        </div>
    )
}