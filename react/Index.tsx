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

  'pack_propulsow',
  'pp_div',
  'pp_titulo',

  'pp_item_primero',
  'pp_elemento',
  'productIdPrimero',
  'pp_item_imagen',
  'pp_item_contenido',
  'pp_item_nombre',
  'pp_item_precio',

  'pp_operador-01',
  'pp_operador',

  'pp_item_segundo',
  'pp_item_actions',
  'pp_boton_cambiar',
  'pp_boton_eliminar',
  'pp_boton_agregar',

  'pp_total',
  'pp_total_icono',
  'total__price',
  'pp_boton_comprar',

  'pp_item_tercero',



] as const

const MyComponent: StorefrontFunctionComponent<MyComponentProps> = () => {

  const { data } = useQuery(QUERY_VALUE)

  console.log(data)

  const handles = useCssHandles(CSS_HANDLES)
  const productContextValue = useProduct()
  const imgUrl = productContextValue?.product?.items[0]?.images[0].imageUrl;
  const categoria = productContextValue?.product?.categoryId;
  console.log(categoria);
  return (
    <div>
      {data && (
        <div id="pack_propulsow" className={`${handles.pack_propulsow}`}>
          <div id="pp_div" className={`${handles.pp_div}`}>
            <div className={`${handles.pp_titulo}`}>
              Complementa tu compra
            </div>
            <div className={`${handles.pp_elemento}`}>
              <div className={`${handles.pp_item_primero}`}>
                <input type="hidden" className={`${handles.productIdPrimero}`} value="2384" />
                <a className={`${handles.pp_item_imagen}`}>
                  <img src={`${imgUrl}`} />
                </a>
                <div className={`${handles.pp_item_contenido}`}>
                  <a className={`${handles.pp_item_nombre}`} href="#">
                    <p className={`${handles.pp_item_nombre}`}>{productContextValue?.product?.productName}</p>
                  </a>
                  <p className={`${handles.pp_item_precio}`}><span>$ {productContextValue?.product?.priceRange?.listPrice?.lowPrice}</span></p>
                </div>
              </div>
              <div className={`${handles.pp_operador}`}>+</div>

              
              <div className={`${handles.pp_item_segundo}`}>
                <div className={`${handles.pp_item_actions}`}>
                  <button className={`${handles.pp_boton_cambiar}`} type="button">
                    <i className="fas fa-sync"></i>
                    Cambiar
                  </button>
                  <button className={`${handles.pp_boton_eliminar}`} type="button">
                    <i></i>
                    Eliminar
                  </button>
                  <button className={`${handles.pp_boton_agregar}`} type="button">
                    <i className="fas fa-plus"></i>
                    Agregar
                  </button>
                </div>
                <a className={`${handles.pp_item_imagen}`} href="">
                  <img src={`${data.products[1].items[0].images[0].imageUrl}`}  />
                </a>
                <div className={`${handles.pp_item_contenido}`}>
                  <a className={`${handles.pp_item_nombre}`} href="">
                    <p className={`${handles.pp_item_nombre}`}>{`${data.products[1].items[0].nameComplete}`}</p>
                  </a>
                  <p className={`${handles.pp_item_precio}`}><span>$ {`${data.products[1].items[0].sellers[0].commertialOffer.ListPrice}`}</span></p>
                </div>
              </div>
              
              <div className={`${handles.pp_operador}`}>+</div>
              <div className={`${handles.pp_item_tercero}`}>
                <div className={`${handles.pp_item_actions}`}>
                  <button className={`${handles.pp_boton_cambiar}`} type="button">
                    <i className="fas fa-sync"></i>
                    Cambiar
                  </button>
                  <button className={`${handles.pp_boton_eliminar}`} type="button">
                    <i className="fas fa-times"></i>
                    Eliminar
                  </button>
                  <button className={`${handles.pp_boton_agregar}`} type="button">
                    <i className="fas fa-plus"></i>
                    Agregar
                  </button>
                </div>
                <a className={`${handles.pp_item_imagen}`} href="">
                  <img src={`${data.products[0].items[0].images[0].imageUrl}`} />
                </a>
                <div className={`${handles.pp_item_contenido}`}>
                  <a className={`${handles.pp_item_nombre}`} href="">
                    <p className={`${handles.pp_item_nombre}`}>{`${data.products[0].items[0].nameComplete}`}</p>
                  </a>
                  <p className={`${handles.pp_item_precio}`}><span>$ {`${data.products[0].items[0].sellers[0].commertialOffer.ListPrice}`}</span></p>
                </div>
              </div>
              <div className={`${handles.pp_operador}`}>=</div>
              <div className={`${handles.pp_total}`}>
                <div className={`${handles.pp_total_icono}`}></div>
                <p>Comprar 3 productos por</p><span className={`${handles.total__price}`}>$81.290</span>
                <button className={`${handles.pp_boton_comprar}`} type="button">
                  Comprar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
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