import Reactotron, { networking } from "reactotron-react-native";

Reactotron.configure()
    .use(networking()) // <--- here we go!
    .connect();