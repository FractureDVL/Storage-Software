import { useEffect, useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import Alert from "../../alertas/Alert";
import { useLocation, useNavigate } from "react-router-dom"
import keys from "../../../keys/Keys"
import Select from "react-select"
import { customAlphabet } from 'nanoid';
import { useCart } from "../../../contexts/CartContext";

function Checkout() {
   const alfabeto = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   const [alert, setAlert] = useState(null);
   const { user, isAuthenticated } = useAuth()
   const { pedido } = useCart()
   const navigate = useNavigate()
   const generarCodigo = customAlphabet(alfabeto, 12)
   const location = useLocation();
   const obtenidoLoc = location.state;
   console.log(location.state);

   const [formData, setFormData] = useState({
      currency: keys.CURRENCY,
      amountInCents: `${54000}00`,
      reference: `${generarCodigo()}`,
      publicKey: keys.PUBLIC_KEY,
      integrity: keys.TEST_INTEGRIDAD,
      customerData: {
         email: user.email,
         fullName: `${user.first_name} ${user.last_name}`,
         legalId: user.information.identification,
      },
      shippingAddress: {
         addressLine1: user.information.address,
         city: "", //
         region: "", //
         country: "", //
         phoneNumber: "", //
      },
   });

   const handleSubmit = async () => {
      if (isAuthenticated) {
         try {
            const res = await checkout()
            console.log(res);
            return;
         } catch (error) {
            console.error(error);
            return;
         }
      } else return navigate('/login');
   }

   const handleChange = (event) => {
      const { name, value } = event.target;

      if (name === 'region' || name === 'city') {
         setFormData({
            ...formData,
            shippingAddress: {
               ...formData.shippingAddress,
               [name]: value,
            },
         });
      } else if (name === 'address') {
         setFormData({
            ...formData,
            shippingAddress: {
               ...formData.shippingAddress,
               addressLine1: value,
            },
         });
      } else if (name === 'cellphone') {
         setFormData({
            ...formData,
            shippingAddress: {
               ...formData.shippingAddress,
               phoneNumber: value,
            },
         });
      } else {
         setFormData({
            ...formData,
            [name]: value,
         });
      }
   };

   const options = [
      { value: 'AF', label: 'Afghanistan' },
      { value: 'AX', label: 'Åland Islands' },
      { value: 'AL', label: 'Albania' },
      { value: 'DZ', label: 'Algeria' },
      { value: 'AS', label: 'American Samoa' },
      { value: 'AD', label: 'Andorra' },
      { value: 'AO', label: 'Angola' },
      { value: 'AI', label: 'Anguilla' },
      { value: 'AQ', label: 'Antarctica' },
      { value: 'AG', label: 'Antigua and Barbuda' },
      { value: 'AR', label: 'Argentina' },
      { value: 'AM', label: 'Armenia' },
      { value: 'AW', label: 'Aruba' },
      { value: 'AU', label: 'Australia' },
      { value: 'AT', label: 'Austria' },
      { value: 'AZ', label: 'Azerbaijan' },
      { value: 'BS', label: 'Bahamas' },
      { value: 'BH', label: 'Bahrain' },
      { value: 'BD', label: 'Bangladesh' },
      { value: 'BB', label: 'Barbados' },
      { value: 'BY', label: 'Belarus' },
      { value: 'BE', label: 'Belgium' },
      { value: 'BZ', label: 'Belize' },
      { value: 'BJ', label: 'Benin' },
      { value: 'BM', label: 'Bermuda' },
      { value: 'BT', label: 'Bhutan' },
      { value: 'BO', label: 'Bolivia' },
      { value: 'BQ', label: 'Bonaire, Sint Eustatius and Saba' },
      { value: 'BA', label: 'Bosnia and Herzegovina' },
      { value: 'BW', label: 'Botswana' },
      { value: 'BV', label: 'Bouvet Island' },
      { value: 'BR', label: 'Brazil' },
      { value: 'IO', label: 'British Indian Ocean Territory' },
      { value: 'BN', label: 'Brunei Darussalam' },
      { value: 'BG', label: 'Bulgaria' },
      { value: 'BF', label: 'Burkina Faso' },
      { value: 'BI', label: 'Burundi' },
      { value: 'KH', label: 'Cambodia' },
      { value: 'CM', label: 'Cameroon' },
      { value: 'CA', label: 'Canada' },
      { value: 'CV', label: 'Cape Verde' },
      { value: 'KY', label: 'Cayman Islands' },
      { value: 'CF', label: 'Central African Republic' },
      { value: 'TD', label: 'Chad' },
      { value: 'CL', label: 'Chile' },
      { value: 'CN', label: 'China' },
      { value: 'CX', label: 'Christmas Island' },
      { value: 'CC', label: 'Cocos (Keeling) Islands' },
      { value: 'CO', label: 'Colombia' },
      { value: 'KM', label: 'Comoros' },
      { value: 'CG', label: 'Congo' },
      { value: 'CD', label: 'Congo, Democratic Republic' },
      { value: 'CK', label: 'Cook Islands' },
      { value: 'CR', label: 'Costa Rica' },
      { value: 'CI', label: 'Côte d Ivoire' },
      { value: 'HR', label: 'Croatia' },
      { value: 'CU', label: 'Cuba' },
      { value: 'CW', label: 'Curaçao' },
      { value: 'CY', label: 'Cyprus' },
      { value: 'CZ', label: 'Czech Republic' },
      { value: 'DK', label: 'Denmark' },
      { value: 'DJ', label: 'Djibouti' },
      { value: 'DM', label: 'Dominica' },
      { value: 'DO', label: 'Dominican Republic' },
      { value: 'EC', label: 'Ecuador' },
      { value: 'EG', label: 'Egypt' },
      { value: 'SV', label: 'El Salvador' },
      { value: 'GQ', label: 'Equatorial Guinea' },
      { value: 'ER', label: 'Eritrea' },
      { value: 'EE', label: 'Estonia' },
      { value: 'ET', label: 'Ethiopia' },
      { value: 'FK', label: 'Falkland Islands' },
      { value: 'FO', label: 'Faroe Islands' },
      { value: 'FJ', label: 'Fiji' },
      { value: 'FI', label: 'Finland' },
      { value: 'FR', label: 'France' },
      { value: 'GF', label: 'French Guiana' },
      { value: 'PF', label: 'French Polynesia' },
      { value: 'TF', label: 'French Southern Territories' },
      { value: 'GA', label: 'Gabon' },
      { value: 'GM', label: 'Gambia' },
      { value: 'GE', label: 'Georgia' },
      { value: 'DE', label: 'Germany' },
      { value: 'GH', label: 'Ghana' },
      { value: 'GI', label: 'Gibraltar' },
      { value: 'GR', label: 'Greece' },
      { value: 'GL', label: 'Greenland' },
      { value: 'GD', label: 'Grenada' },
      { value: 'GP', label: 'Guadeloupe' },
      { value: 'GU', label: 'Guam' },
      { value: 'GT', label: 'Guatemala' },
      { value: 'GG', label: 'Guernsey' },
      { value: 'GN', label: 'Guinea' },
      { value: 'GW', label: 'Guinea-Bissau' },
      { value: 'GY', label: 'Guyana' },
      { value: 'HT', label: 'Haiti' },
      { value: 'HM', label: 'Heard Island and McDonald Islands' },
      { value: 'VA', label: 'Holy See (Vatican City State)' },
      { value: 'HN', label: 'Honduras' },
      { value: 'HK', label: 'Hong Kong' },
      { value: 'HU', label: 'Hungary' },
      { value: 'IS', label: 'Iceland' },
      { value: 'IN', label: 'India' },
      { value: 'ID', label: 'Indonesia' },
      { value: 'IR', label: 'Iran' },
      { value: 'IQ', label: 'Iraq' },
      { value: 'IE', label: 'Ireland' },
      { value: 'IM', label: 'Isle of Man' },
      { value: 'IL', label: 'Israel' },
      { value: 'IT', label: 'Italy' },
      { value: 'JM', label: 'Jamaica' },
      { value: 'JP', label: 'Japan' },
      { value: 'JE', label: 'Jersey' },
      { value: 'JO', label: 'Jordan' },
      { value: 'KZ', label: 'Kazakhstan' },
      { value: 'KE', label: 'Kenya' },
      { value: 'KI', label: 'Kiribati' },
      { value: 'KP', label: 'Korea, North' },
      { value: 'KR', label: 'Korea, South' },
      { value: 'KW', label: 'Kuwait' },
      { value: 'KG', label: 'Kyrgyzstan' },
      { value: 'LA', label: 'Laos' },
      { value: 'LV', label: 'Latvia' },
      { value: 'LB', label: 'Lebanon' },
      { value: 'LS', label: 'Lesotho' },
      { value: 'LR', label: 'Liberia' },
      { value: 'LY', label: 'Libya' },
      { value: 'LI', label: 'Liechtenstein' },
      { value: 'LT', label: 'Lithuania' },
      { value: 'LU', label: 'Luxembourg' },
      { value: 'MO', label: 'Macao' },
      { value: 'MK', label: 'North Macedonia' },
      { value: 'MG', label: 'Madagascar' },
      { value: 'MW', label: 'Malawi' },
      { value: 'MY', label: 'Malaysia' },
      { value: 'MV', label: 'Maldives' },
      { value: 'ML', label: 'Mali' },
      { value: 'MT', label: 'Malta' },
      { value: 'MH', label: 'Marshall Islands' },
      { value: 'MQ', label: 'Martinique' },
      { value: 'MR', label: 'Mauritania' },
      { value: 'MU', label: 'Mauritius' },
      { value: 'YT', label: 'Mayotte' },
      { value: 'MX', label: 'Mexico' },
      { value: 'FM', label: 'Micronesia' },
      { value: 'MD', label: 'Moldova' },
      { value: 'MC', label: 'Monaco' },
      { value: 'MN', label: 'Mongolia' },
      { value: 'ME', label: 'Montenegro' },
      { value: 'MS', label: 'Montserrat' },
      { value: 'MA', label: 'Morocco' },
      { value: 'MZ', label: 'Mozambique' },
      { value: 'MM', label: 'Myanmar' },
      { value: 'NA', label: 'Namibia' },
      { value: 'NR', label: 'Nauru' },
      { value: 'NP', label: 'Nepal' },
      { value: 'NL', label: 'Netherlands' },
      { value: 'NC', label: 'New Caledonia' },
      { value: 'NZ', label: 'New Zealand' },
      { value: 'NI', label: 'Nicaragua' },
      { value: 'NE', label: 'Niger' },
      { value: 'NG', label: 'Nigeria' },
      { value: 'NU', label: 'Niue' },
      { value: 'NF', label: 'Norfolk Island' },
      { value: 'MP', label: 'Northern Mariana Islands' },
      { value: 'NO', label: 'Norway' },
      { value: 'OM', label: 'Oman' },
      { value: 'PK', label: 'Pakistan' },
      { value: 'PW', label: 'Palau' },
      { value: 'PS', label: 'Palestine' },
      { value: 'PA', label: 'Panama' },
      { value: 'PG', label: 'Papua New Guinea' },
      { value: 'PY', label: 'Paraguay' },
      { value: 'PE', label: 'Peru' },
      { value: 'PH', label: 'Philippines' },
      { value: 'PN', label: 'Pitcairn' },
      { value: 'PL', label: 'Poland' },
      { value: 'PT', label: 'Portugal' },
      { value: 'PR', label: 'Puerto Rico' },
      { value: 'QA', label: 'Qatar' },
      { value: 'RE', label: 'Réunion' },
      { value: 'RO', label: 'Romania' },
      { value: 'RU', label: 'Russia' },
      { value: 'RW', label: 'Rwanda' },
      { value: 'BL', label: 'Saint Barthélemy' },
      { value: 'SH', label: 'Saint Helena' },
      { value: 'KN', label: 'Saint Kitts and Nevis' },
      { value: 'LC', label: 'Saint Lucia' },
      { value: 'MF', label: 'Saint Martin (French part)' },
      { value: 'PM', label: 'Saint Pierre and Miquelon' },
      { value: 'VC', label: 'Saint Vincent and the Grenadines' },
      { value: 'WS', label: 'Samoa' },
      { value: 'SM', label: 'San Marino' },
      { value: 'ST', label: 'Sao Tome and Principe' },
      { value: 'SA', label: 'Saudi Arabia' },
      { value: 'SN', label: 'Senegal' },
      { value: 'RS', label: 'Serbia' },
      { value: 'SC', label: 'Seychelles' },
      { value: 'SL', label: 'Sierra Leone' },
      { value: 'SG', label: 'Singapore' },
      { value: 'SX', label: 'Sint Maarten (Dutch part)' },
      { value: 'SK', label: 'Slovakia' },
      { value: 'SI', label: 'Slovenia' },
      { value: 'SB', label: 'Solomon Islands' },
      { value: 'SO', label: 'Somalia' },
      { value: 'ZA', label: 'South Africa' }
   ]

   const checkout = async () => {
      try {
         const res = await pedido(obtenidoLoc);
         if (res.status == 400) {
            setAlert({
               title: 'Error al Redimir Cupón',
               desc: `${res.data.mensaje}. Introduce otro o elimina el actual.`,
               bg_color: 'bg-yellow-100',
               border_color: 'border-yellow-500',
               text_color: 'text-yellow-900',
               svg_color: 'text-yellow-500',
               bar_color: 'bg-yellow-500',
            })
         }
         return res
      } catch (error) {
         console.error("Error al Redimir Cupón");
      }
   }

   const CustomOption = ({ innerProps, data }) => (
      <div {...innerProps} key={data.value} className="ml-4 my-1">
         ({data.value}) {data.label}
      </div>
   );

   const CustomSingleValue = ({ innerProps, data }) => (
      <div {...innerProps} key={data.value} className="ml-2">
         ({data.value}) {data.label}
      </div>
   );

   useEffect(() => {
      encriptarSHA256()
   }, []);

   const [hash, setHash] = useState('');

   const encriptarSHA256 = async () => {
      const encondedText = new TextEncoder().encode(`${formData.reference}${formData.amountInCents}${keys.CURRENCY}${keys.TEST_INTEGRIDAD}`);
      const hashBuffer = await crypto.subtle.digest('SHA-256', encondedText);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      setHash(hashHex)
      return hashHex
   }

   return (
      <>
         {
            alert && (
               <Alert
                  msg={{
                     title: alert.title,
                     desc: alert.desc,
                     bg_color: alert.bg_color,
                     border_color: alert.border_color,
                     text_color: alert.text_color,
                     svg_color: alert.svg_color,
                     bar_color: alert.bar_color,
                  }}
                  onClick={() => setAlert(null)}
               />
            )
         }
         <div className='container mx-auto mt-10 font-lexend'>
            <form onSubmit={handleSubmit} action="https://checkout.wompi.co/p/" method="GET" className="col-span-1 max-sm:col-span-3 flex justify-center items-center flex-col m-4 text-black">
               <div className='text-center mb-2 max-w-md'>
                  <h1 className='font-extrabold text-black text-3xl'>Confirmar Datos</h1>
               </div>
               <div className='space-y-2 max-w-md w-full grid grid-cols-4 space-x-4'>
                  <div className="col-span-4 !ml-0 grid grid-cols-11">
                     <div className='col-span-5'>
                        <label className="mb-2 text-xs font-bold">Nombre Completo</label>
                        <input
                           placeholder={`${user.first_name} ${user.last_name}`}
                           className="text-sm rounded-lg w-full p-2.5 bg-gray-100 placeholder:text-gray-400"
                           disabled
                           readOnly
                        />
                     </div>
                     <div className="col-span-1" />
                     <div className='col-span-5'>
                        <label className="mb-2 text-xs font-bold">Email</label>
                        <input
                           placeholder={user.email}
                           className="text-sm rounded-lg w-full p-2.5 bg-gray-100 placeholder:text-gray-400"
                           disabled
                           readOnly
                        />
                     </div>
                  </div>
                  <div className="col-span-4 !ml-0 grid grid-cols-11">
                     <div className="col-span-5 truncate">
                        <label className="mb-2 text-xs font-bold">Número de Identidad</label>
                        <input
                           placeholder={user.information.identification}
                           className="text-sm rounded-lg block w-full p-2.5 bg-gray-100 placeholder:text-gray-400"
                           disabled
                           readOnly
                        />
                     </div>
                     <div className="col-span-1" />
                     <div className="col-span-5 truncate">
                        <label htmlFor="cellphone" className="mb-2 text-xs font-bold">Número de Teléfono</label>
                        <input id="cellphone"
                           type="number"
                           name="cellphone"
                           className="text-sm rounded-lg block w-full p-2.5 bg-gray-100 placeholder:text-gray-400"
                           onChange={handleChange}
                           required
                        />
                     </div>
                  </div>
                  <div className="col-span-4 !ml-0 grid grid-cols-11">
                     <div className="col-span-5">
                        <label htmlFor="country" className="text-xs font-bold">Pais</label>
                        <Select
                           className="text-sm rounded-lg w-full bg-gray-100 placeholder:text-gray-400"
                           id="country"
                           type="text"
                           name="country"
                           isSearchable={false}
                           options={options}
                           components={{ Option: CustomOption, SingleValue: CustomSingleValue }}
                           onChange={({ value }) => {
                              setFormData({
                                 ...formData,
                                 shippingAddress: {
                                    ...formData.shippingAddress,
                                    country: value,
                                 },
                              });
                           }}
                           required
                        />
                     </div>
                     <div className="col-span-1" />
                     <div className='col-span-5'>
                        <label htmlFor="region" className="mb-2 text-xs font-bold">Departamento</label>
                        <input id="region"
                           type="text"
                           name="region"
                           className="text-sm rounded-lg w-full p-2.5 bg-gray-100 placeholder:text-gray-400"
                           onChange={handleChange}
                           required
                        />
                     </div>
                  </div>

                  <div className="col-span-4 !ml-0 grid grid-cols-11">
                     <div className='col-span-5'>
                        <label htmlFor="city" className="mb-2 text-xs font-bold">Ciudad</label>
                        <input id="city"
                           type="text"
                           name="city"
                           className="text-sm rounded-lg w-full p-2.5 bg-gray-100 placeholder:text-gray-400"
                           onChange={handleChange}
                           required
                        />
                     </div>
                     <div className="col-span-1" />
                     <div className="col-span-5 truncate">
                        <label htmlFor="address" className="text-xs font-bold">Dirección</label>
                        <input id="address"
                           type="text"
                           name="address"
                           placeholder={user.information.address}
                           value={user.information.address}
                           className="text-sm rounded-lg block w-full p-2.5 bg-gray-100 placeholder:text-gray-400"
                           onChange={handleChange}
                           required
                        />
                     </div>
                  </div>

                  <input type="hidden" name="public-key" value={`${formData.publicKey}`} />
                  <input type="hidden" name="currency" value={`${formData.currency}`} />
                  <input type="hidden" name="amount-in-cents" value={`${formData.amountInCents}`} />
                  <input type="hidden" name="reference" value={`${formData.reference}`} />
                  <input type="hidden" name="signature:integrity" value={`${hash}`} />
                  <input type="hidden" name="customer-data:email" value={`${formData.customerData.email}`} />
                  <input type="hidden" name="customer-data:full-name" value={`${formData.customerData.fullName}`} />
                  <input type="hidden" name="customer-data:legal-id" value={`${formData.customerData.legalId}`} />
                  <input type="hidden" name="customer-data:legal-id-type" value={`CC`} />
                  <input type="hidden" name="shipping-address:address-line-1" value={`${formData.shippingAddress.addressLine1}`} />
                  <input type="hidden" name="customer-data:phone-number" value={`${formData.shippingAddress.phoneNumber}`} />
                  <input type="hidden" name="shipping-address:phone-number" value={`${formData.shippingAddress.phoneNumber}`} />
                  <input type="hidden" name="shipping-address:country" value={`${formData.shippingAddress.country}`} />
                  <input type="hidden" name="shipping-address:city" value={`${formData.shippingAddress.city}`} />
                  <input type="hidden" name="shipping-address:region" value={`${formData.shippingAddress.region}`} />
                  <div className='text-center col-span-4 !ml-0'>
                     <div className="border-yellow-500 border-2 bg-yellow-100 text-yellow-700 rounded-md my-4 grid grid-cols-12 py-2">
                        <div className="col-span-1 max-sm:col-span-2 flex justify-center items-center">
                           <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 256 256"><path fill="currentColor" d="M236.8 188.09L149.35 36.22a24.76 24.76 0 0 0-42.7 0L19.2 188.09a23.51 23.51 0 0 0 0 23.72A24.35 24.35 0 0 0 40.55 224h174.9a24.35 24.35 0 0 0 21.33-12.19a23.51 23.51 0 0 0 .02-23.72Zm-13.87 15.71a8.5 8.5 0 0 1-7.48 4.2H40.55a8.5 8.5 0 0 1-7.48-4.2a7.59 7.59 0 0 1 0-7.72l87.45-151.87a8.75 8.75 0 0 1 15 0l87.45 151.87a7.59 7.59 0 0 1-.04 7.72ZM120 144v-40a8 8 0 0 1 16 0v40a8 8 0 0 1-16 0Zm20 36a12 12 0 1 1-12-12a12 12 0 0 1 12 12Z" /></svg>
                        </div>
                        <p className="text-xs text-justify col-span-11 max-sm:col-span-10 pr-4">
                           Por favor, asegúrese de validar sus datos para garantizar una transacción segura y eficiente sin errores. Complete los campos restantes con precisión para facilitar el proceso.
                        </p>
                     </div>
                     <button type="submit" className='bg-black w-full text-white py-2 rounded-lg max-sm:mb-8'>
                        Pagar
                     </button>
                  </div>
               </div>
            </form>
         </div>
      </>
   );
}

export default Checkout;
