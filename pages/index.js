import { Box, Button, Text, TextField, Image } from '@skynexui/components'
import { useState, useEffect } from 'react'
import appConfig from '../config.json'
import { useRouter } from 'next/router'

function Titulo(props) {
   const Tag = props.tag || 'h1'
   return (
      <>
         <Tag>{props.children}</Tag>
         <style jsx>{`
				${Tag} {
					color: ${appConfig.theme.colors.neutrals['000']};
					font-size: 24px;
					font-weight: 600;
				}
			`}</style>
      </>
   )
}

export default function HomePage() {
   const [username, setUsername] = useState('')
   const [visibleSubmit, setVisibleSubmit] = useState(false)
   const [usernameUrl, setUsernameUrl] = useState('')
   const [usernameData, setUsernameData] = useState({ followers: 0, name: '' })
   const router = useRouter()
   useEffect(() => {
      fetch(`https://api.github.com/users/${username}`)
         .then(res => {
            if (res.ok) return res.json()
         })
         .then(data => {
            if (data) {
               setUsernameUrl(`https://github.com/${username}.png`)
               setUsernameData(data)
               setVisibleSubmit(true)
            }
         })
   }, [])

   return (
      <>
         <Box
            styleSheet={{
               display: 'flex',
               alignItems: { xs: 'center', sm: 'end', md: 'end', lg: 'center' },
               paddingBottom: { xs: '0', sm: '20vw', md: '18vw', lg: '0' },
               justifyContent: 'center',
               backgroundBlendMode: 'multiply',
               backgroundImage: 'url(https://i.ibb.co/pnJg84Y/Sample-Bkg.png)',
               backgroundRepeat: 'no-repeat',
               backgroundSize: {
                  xs: '100%',
                  sm: '120%',
                  md: '105%',
                  lg: '100% 110%',
               },
               'background-position': {
                  sm: '60% top',
                  md: '60% top',
                  lg: '60% 50%',
               },
            }}>
            <Box
               styleSheet={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexDirection: {
                     xs: 'column',
                     sm: 'row',
                  },
                  width: '100%',
                  maxWidth: '700px',
                  borderRadius: '30px',
                  padding: '32px',
                  margin: '16px',
                  boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                  backgroundColor: appConfig.theme.colors.neutrals[700] + 'f1',
               }}>
               {/* Formulário */}
               <Box
                  autoComplete="off"
                  as='form'
                  onSubmit={event => {
                     event.preventDefault();
                     router.push('/chat');
                  }}
                  styleSheet={{
                     display: 'flex',
                     flexDirection: 'column',
                     alignItems: 'center',
                     justifyContent: 'center',
                     width: { xs: '100%', sm: '50%' },
                     textAlign: 'center',
                     marginBottom: '32px',
                  }}
               >
                  <Titulo tag='h2'>Boas vindas de volta!</Titulo>
                  <Text
                     variant='body1'
                     styleSheet={{
                        marginTop: '5px',
                        marginBottom: '32px',
                        color: appConfig.theme.colors.neutrals[300],
                     }}>
                     {username}
                  </Text>
                  <TextField
                     fullWidth
                     textFieldColors={{
                        neutral: {
                           textColor: appConfig.theme.colors.neutrals[200],
                           mainColor: appConfig.theme.colors.neutrals[900],
                           mainColorHighlight:
                              appConfig.theme.colors.primary[500],
                           backgroundColor:
                              appConfig.theme.colors.neutrals[800],
                        },
                     }}
                     placeholder='GitHub User'
                     value={username}
                     onChange={function (event) {
                        event.preventDefault();
                        setUsername(event.target.value)
                        if (event.target.value.length >= 0) {
                           setVisibleSubmit(true)
                           fetch(
                              `https://api.github.com/users/${event.target.value}`
                           )
                              .then(res => {
                                 if (res.ok) return res.json()
                                 else {
                                    setVisibleSubmit(false)
                                    setUsernameUrl('')
                                    setUsernameData({ followers: 0, name: '' })
                                 }
                              })
                              .then(data => {
                                 if (data) {
                                    setUsernameUrl(
                                       `https://github.com/${event.target.value}.png`
                                    )
                                    setUsernameData(data)
                                    setVisibleSubmit(true)
                                 }
                              })
                        } else {
                           setVisibleSubmit(false)
                           setUsernameUrl('')
                           setUsernameData({ followers: 0, name: '' })
                        }
                     }}
                  />
                  <Button
                     type='submit'
                     label='Entrar'
                     fullWidth
                     buttonColors={{
                        contrastColor: appConfig.theme.colors.neutrals['000'],
                        mainColor: visibleSubmit
                           ? appConfig.theme.colors.primary[500]
                           : 'grey	',
                        mainColorLight: appConfig.theme.colors.neutrals[400],
                        mainColorStrong: visibleSubmit
                           ? appConfig.theme.colors.primary[600]
                           : 'grey	',
                     }}
                     disabled={!visibleSubmit}
                  />
               </Box>
               {/* Formulário */}

               {/* Photo Area */}
               <Box
                  styleSheet={{
                     display: 'flex',
                     flexDirection: 'column',
                     alignItems: 'center',
                     maxWidth: '200px',
                     padding: '16px',
                     backgroundColor:
                        appConfig.theme.colors.neutrals[800] + '90',
                     border: '1px solid',
                     borderColor: appConfig.theme.colors.neutrals[999],
                     borderRadius: '10px',
                     flex: 1,
                     minHeight: '240px',
                  }}>
                  <Image
                     styleSheet={{
                        borderRadius: '50%',
                        marginBottom: '16px',
                        display: visibleSubmit ? 'block' : 'none',
                     }}
                     src={usernameUrl}
                  />
                  <Image
                     styleSheet={{
                        borderRadius: '50%',
                        marginBottom: '16px',
                        display: visibleSubmit ? 'none' : 'block',
                     }}
                     src={`/headset.gif`}
                  />
                  <Text
                     variant='body3'
                     styleSheet={{
                        color: appConfig.theme.colors.neutrals[200],
                        backgroundColor: visibleSubmit
                           ? appConfig.theme.colors.primary[600]
                           : appConfig.theme.colors.neutrals[900],
                        marginVertical: '8px',
                        padding: '3px 10px',
                        borderRadius: '1000px',
                     }}>
                     {usernameData.name}
                  </Text>
                  <Text
                     variant='body4'
                     styleSheet={{
                        color: appConfig.theme.colors.neutrals[400],
                        backgroundColor: appConfig.theme.colors.neutrals[900],
                        padding: '3px 10px',
                        borderRadius: '1000px',
                     }}>
                     <svg
                        style={{
                           verticalAlign: 'bottom',
                           height: '15px',
                           width: '20px',
                        }}>
                        <path
                           style={{
                              fill: appConfig.theme.colors.neutrals[400],
                           }}
                           fillRule='evenodd'
                           d='M5.5 3.5a2 2 0 100 4 2 2 0 000-4zM2 5.5a3.5 3.5 0 115.898 2.549 5.507 5.507 0 013.034 4.084.75.75 0 11-1.482.235 4.001 4.001 0 00-7.9 0 .75.75 0 01-1.482-.236A5.507 5.507 0 013.102 8.05 3.49 3.49 0 012 5.5zM11 4a.75.75 0 100 1.5 1.5 1.5 0 01.666 2.844.75.75 0 00-.416.672v.352a.75.75 0 00.574.73c1.2.289 2.162 1.2 2.522 2.372a.75.75 0 101.434-.44 5.01 5.01 0 00-2.56-3.012A3 3 0 0011 4z'></path>
                     </svg>
                     {' ' + usernameData.followers + ' followers'}
                  </Text>
               </Box>
               {/* Photo Area */}
            </Box>
         </Box>
      </>
   )
}