/* eslint-disable no-console */
import React from 'react'
import { injectIntl } from 'react-intl'
import { useCssHandles } from 'vtex.css-handles'
//import { MyComponentProps } from './typings/global'
import { useQuery } from 'react-apollo'
import QUERY_VALUE from './types/checkout.gql'
import { useProduct } from 'vtex.product-context'
//import $ from "jquery"
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

const MyComponent= () => {

  let { data } = useQuery(QUERY_VALUE)

  console.log("data",data)

  const handles = useCssHandles(CSS_HANDLES)
  const productContextValue = useProduct()
  const categoria = productContextValue?.product?.categoryId;
  console.log("cat",categoria);
  let head;
  let element;
  let element2;

  function HeadComp(props:any){

    return <div className={props.item}>
    <button className={props.cambiar} type="button" /* onClick={Cambiar} */>
      <i className="fas fa-sync"></i>
      Cambiar
    </button>
    <button className={props.eliminar} type="button">
      <i></i>
      Eliminar
    </button>
    <button className={props.agregar} type="button">
      <i className="fas fa-plus"></i>
      Agregar
    </button>
  </div>
  }
  
if (data)
{  
  head = <HeadComp item={handles.pp_item_actions} 
                          cambiar={handles.pp_boton_cambiar} 
                           eliminar={handles.pp_boton_eliminar}
                           agregar={handles.pp_boton_agregar}/>;
}
 
function Producto(props:any) {
    
  return <div >
<input type="hidden" className={`${handles.productIdPrimero}`} value="2384" />
                <a className={`${handles.pp_item_imagen}`}>
                  <img src={props.img} />
                </a>
                <div className={`${handles.pp_item_contenido}`}>
                  <a className={`${handles.pp_item_nombre}`} href="#">
                    <p className={`${handles.pp_item_nombre}`}>{props.name}</p>
                  </a>
                  <p className={`${handles.pp_item_precio}`}><span>$ {props.price}</span></p>
                </div>
                </div>
                }

  let producto = <Producto name={productContextValue?.product?.productName} 
                img={productContextValue?.product?.items[0]?.images[0].imageUrl} 
                 price={productContextValue?.product?.priceRange?.listPrice?.lowPrice}/>;

  function Elemento(props:any) {
    

    //const limpiar= $(".pp_item_primero").html("");

   // {limpiar}
    return <div >
    
    <a className={`${handles.pp_item_imagen}`} href="">
      <img src={props.img}  />
    </a>
    <div className={`${handles.pp_item_contenido}`}>
      <a className={`${handles.pp_item_nombre}`} href="">
        <p className={`${handles.pp_item_nombre}`}>{props.name}</p>
      </a>
      <p className={`${handles.pp_item_precio}`}><span>$ {props.price}</span></p>
    </div>
  </div>
  }

  if (data)
  {  
  element = <Elemento name={data.products[1].items[0].nameComplete} 
                          img={data.products[1].items[0].images[0].imageUrl} 
                           price={data.products[1].items[0].sellers[0].commertialOffer.ListPrice}/>;
  
  element2 = <Elemento name={data.products[1].items[0].nameComplete} 
                           img={data.products[1].items[0].images[0].imageUrl} 
                            price={data.products[1].items[0].sellers[0].commertialOffer.ListPrice}/>;
               
  }
  console.log("element",element?.props)

  function Suma(props:any){
      return props.p1+props.p2+props.p3
  }

  let elemsuma= <Suma p1={element?.props.price} p2={element2?.props.price} p3={producto?.props.price}/>

  /* function Cambiar(){
    return <Elemento name={data.products[3].items[0].nameComplete}  
              img={data.products[3].items[0].images[0].imageUrl} 
              price={data.products[3].items[0].sellers[0].commertialOffer.ListPrice}/>;
  } */

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
                {producto}                
              </div>
              
              <div className={`${handles.pp_operador}`}>+</div>

              <div className={`${handles.pp_item_segundo}`}>
                 {head}
                 {element}
              </div>
              
              <div className={`${handles.pp_operador}`}>+</div>
              
              <div className={`${handles.pp_item_tercero}`}>
               {head}
               {element2}
              </div>
              <div className={`${handles.pp_operador}`}>=</div>

              <div className={`${handles.pp_total}`}>
                <div className={`${handles.pp_total_icono}`}></div>
                <p>Comprar 3 productos por</p><span className={`${handles.total__price}`}>$ {elemsuma}</span>
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