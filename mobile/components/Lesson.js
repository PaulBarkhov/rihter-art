import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Watch from './Watch'
import Practice from './Practice'
import Comments from './Comments'

const Tab = createMaterialTopTabNavigator();

const Lesson = ({ route, navigation }) => {

    return (
        <Tab.Navigator>
            <Tab.Screen name="Watch" component={Watch} initialParams={route.params.lesson} />
            <Tab.Screen name="Practice" component={Practice} initialParams={route.params.lesson} />
            <Tab.Screen name="Comments" component={Comments} initialParams={route.params.lesson} />
        </Tab.Navigator>
    )
}

export default Lesson
