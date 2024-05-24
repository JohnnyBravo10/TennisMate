import * as React from 'react';
import {View, Text, ScrollView} from 'react-native';

import ReceivedChallenge from './ReceivedChallenge'
import SentChallenge from './SentChallenge'

const Sfide = ({challenges, toggleAccepted, deleteChallenge}) => {

    console.log("sfide da cui partre:", challenges)

    receivedChallenges = challenges.received
    sentChallenges = challenges.sent

    receivedChallenges = receivedChallenges.map((challenge) => {
        return (
            <ReceivedChallenge
                //{...props}
                toggleAccepted={toggleAccepted}
                deleteChallenge={deleteChallenge}
                key={challenge.challengeIndex}
                challenge={challenge} />
        )
    })

    sentChallenges = sentChallenges.map((challenge) => {
        return (
            <SentChallenge
                //{...props}
                deleteChallenge={deleteChallenge}
                key={challenge.challengeIndex}
                challenge={challenge} />
        )
    })

return (
    <ScrollView>
           <View>
           <Text>Sfide ricevute</Text>
           <View>{receivedChallenges}</View>
           </View>
           <View>
           <Text>Sfide inviate</Text>
           <View>{sentChallenges}</View>
           </View>
       </ScrollView>
)
}

export default Sfide