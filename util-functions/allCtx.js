// To import context quicker
import AllContext from '@/a-store/context-store/AllContext';
import { useContext } from 'react';



function AllCtx() {
  return (
  useContext(AllContext)
  )
}

export default AllCtx