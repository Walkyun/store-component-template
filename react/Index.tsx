/* eslint-disable no-console */
import React from 'react'
import { injectIntl } from 'react-intl'
import { useCssHandles } from 'vtex.css-handles'
import { MyComponentProps } from './typings/global'
import { useQuery } from 'react-apollo'
import QUERY_VALUE from './types/checkout.gql'
import { useProduct } from 'vtex.product-context'
//import * as request from 'https'


//Declare Handles for the react component to be accesible
const CSS_HANDLES = [
 
  'someHandle1',
  'someHandle2',
  'someHandle3',
] as const

const MyComponent: StorefrontFunctionComponent<MyComponentProps> = () => {
  
const { data } = useQuery(QUERY_VALUE)

console.log(data)

  const handles = useCssHandles(CSS_HANDLES)
   const productContextValue = useProduct()
   const imgUrl=productContextValue?.product?.items[0]?.images[0].imageUrl;
   const categoria=productContextValue?.product?.categoryId;
   console.log(categoria);
  return (
    <div>
      <div className={`${handles.someHandle1}`}>
        <p>producName = {productContextValue?.product?.productName}</p>
        <p>itemId:{productContextValue?.product?.items[0].itemId}</p>
        <p>Precio: {productContextValue?.product?.priceRange?.listPrice?.lowPrice}</p>
        <img src={`${imgUrl}`}></img>
        <p>categoria:{productContextValue?.product?.categoryId}</p>
      </div>
      <div className={`${handles.someHandle2}`}>
        <p>producName = {productContextValue?.product?.productName}</p>
        <p>itemId:{productContextValue?.product?.items[0].itemId}</p>
        <p>categoria:{productContextValue?.product?.categoryId}</p>
      </div>
      

      {/* Get orderFormId from hook */}
      

      {/* Use of a ReactHook */}
      

      {/* Use of a VTEX StyleGuide https://styleguide.vtex.com/*/}
      
    </div>
  )
}

//This is the schema form that will render the editable props on SiteEditor
MyComponent.schema = {
  title: 'MyComponent Title',
  description: 'MyComponent description',
  type: 'object',
  properties: {
    someString: {
      title: 'SomeString Title',
      description: 'editor.my-component.someString.description',
      type: 'string',
      default: 'SomeString default value',
    },
  },
}

export default injectIntl(MyComponent)

/* class GithubApiService {
  if (categoria="2") {
    getUserInfo(categoria: string){
      request.get('/api/catalog_system/pub/products/search/?fq=C:' + categoria, (response: any) =>{
        console.log(response)
    })
  }
  getRepos(){

  }
}
} */