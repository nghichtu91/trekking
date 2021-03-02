import { Reducer, useReducer, Dispatch } from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import nanoid from 'nanoid'
import produce from 'immer'
import { useRouter } from 'next/router'
import { BaseLayout  } from '../shared/layout/baseLayout';
// import { ListTodosQuery, GetTodoListQuery } from '../src/API'
// import config from '../src/aws-exports'
// import {
//   createTodo,
//   deleteTodo,
//   createTodoList,
// } from '../src/graphql/mutations'
// import { getTodoList } from '../src/graphql/queries'

const MY_ID = nanoid()
// API.configure(config)

// type Todo = Omit<
//   ListTodosQuery['listTodos']['items'][0],
//   '__typename' | 'todoList'
// >

type Props = {
  todos: any
}

// type State = {
//   todos: Todo[]
//   currentName: string
// }

// type Action =
//   | {
//       type: 'add-todo'
//       payload: Todo
//     }
//   | {
//       type: 'delete-todo'
//       payload: string
//     }
//   | {
//       type: 'reset-current'
//     }
//   | { type: 'set-current'; payload: string }

// const reducer: Reducer<State, Action> = (state, action) => {
//   switch (action.type) {
//     case 'add-todo': {
//       return produce(state, (draft) => {
//         draft.todos.push(action.payload)
//       })
//     }
//     case 'delete-todo': {
//       const index = state.todos.findIndex(({ id }) => action.payload === id)
//       if (index === -1) return state
//       return produce(state, (draft) => {
//         draft.todos.splice(index, 1)
//       })
//     }
//     case 'reset-current': {
//       return produce(state, (draft) => {
//         draft.currentName = ''
//       })
//     }
//     case 'set-current': {
//       return produce(state, (draft) => {
//         draft.currentName = action.payload
//       })
//     }
//     default: {
//       return state
//     }
//   }
// }

// const createToDo = async (dispatch: Dispatch<Action>, currentToDo) => {
//   const todo = {
//     id: nanoid(),
//     name: currentToDo,
//     createdAt: `${Date.now()}`,
//     completed: false,
//     todoTodoListId: 'global',
//     userId: MY_ID,
//   }
//   dispatch({ type: 'add-todo', payload: todo })
//   dispatch({ type: 'reset-current' })
//   try {
//     await API.graphql(graphqlOperation(createTodo, { input: todo }))
//   } catch (err) {
//     dispatch({ type: 'set-current', payload: todo.name })
//     console.warn('Error adding to do ', err)
//   }
// }
// const deleteToDo = async (dispatch: Dispatch<Action>, id: string) => {
//   dispatch({ type: 'delete-todo', payload: id })
//   try {
//     await API.graphql({
//       ...graphqlOperation(deleteTodo),
//       variables: { input: { id } },
//     })
//   } catch (err) {
//     console.warn('Error deleting to do ', err)
//   }
// }
const App = (props: Props) => {
  const router = useRouter()
  // const { locale, locales, defaultLocale } = router;
  // console.log(locale, locales, defaultLocale )
  return (
    <BaseLayout>
      Hello  dsd
    </BaseLayout>
  )
}

export const getStaticProps = async () => {
  // let result = (await API.graphql(
  //   graphqlOperation(getTodoList, { id: 'global' })
  // )) as { data: GetTodoListQuery; errors: any[] }

  // if (result.errors) {
  //   console.error('Failed to fetch todolist.', result.errors)
  //   throw new Error(result.errors[0].message)
  // }
  // if (result.data.getTodoList !== null) {
  //   return {
  //     props: {
  //       todos: result.data.getTodoList.todos.items,
  //     },
  //   }
  // }

  // await API.graphql(
  //   graphqlOperation(createTodoList, {
  //     input: {
  //       id: 'global',
  //       createdAt: `${Date.now()}`,
  //     },
  //   })
  // )

  return {
    props: {
      todos: [],
    },
  }
}

export default App
