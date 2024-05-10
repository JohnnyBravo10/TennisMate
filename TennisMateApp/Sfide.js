import * as React from 'react';
import {View, Text} from 'react-native';

import ReceivedChallenge from './ReceivedChallenge'
import SentChallenge from './SentChallenge'

const Sfide = ({challenges, toggleAccepted, deleteChallenge}) => {

    receivedChallenges = challenges.received
    sentChallenges = challenges.sent

    receivedChallenges = receivedChallenges.map((challenge, i) => {
        return (
            <ReceivedChallenge
                toggleAccepted={toggleAccepted}
                deleteChallenge={deleteChallenge}
                key={challenge.challengeIndex}
                challenge={challenge} />
        )
    })

    sentChallenges = sentChallenges.map((challenge, i) => {
        return (
            <SentChallenge
                deleteChallenge={deleteChallenge}
                key={challenge.challengeIndex}
                challenge={challenge} />
        )
    })

return (
    <View>
           <View>
           <Text>Sfide ricevute</Text>
           </View>
           <View>
           <Text>Sfide inviate</Text>
           </View>
       </View>
)
}

export default Sfide