import { OnboardTemplate } from '@modules/profile/components/onboarding/onboardTemplate'
const App = () => {
  return <OnboardTemplate type="login" />
}

export const getStaticProps = async () => {
  return {
    props: {
      todos: [],
    },
  }
}

export default App
