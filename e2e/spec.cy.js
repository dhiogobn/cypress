const { timeout } = require("async")
const { elementAt } = require("rxjs")

const profiles = ['https://www.linkedin.com/in/micheleprofmatematica/', 'https://www.linkedin.com/in/dhiogo-bandeira-nobrega-660951192/', 'https://www.linkedin.com/in/conrado-sanchez-alonso']
// https://www.linkedin.com/in/micheleprofmatematica/
// https://www.linkedin.com/in/dhiogo-bandeira-nobrega-660951192/
const profileUrl = profiles[2]
const loginPage = 'https://www.linkedin.com/authwall?trk=qf&original_referer=https://www.linkedin.com/in/micheleprofmatematica/?originalSubdomain=br&sessionRedirect=https%3A%2F%2Fwww.linkedin.com%2F'

describe('template spec', () => {
  before(() => {
    cy.visit(loginPage, {
      failOnStatusCode: false
      })
      cy.get('.authwall-join-form__form-toggle--bottom').click()
      cy.wait(2000)
      cy.get('#session_key').type('lticontasc@gmail.com')
      cy.get('#session_password').type('Linkedinlti!')
      cy.get('.justify-between > .btn-md').click()
      cy.wait(20000)
      cy.visit(profileUrl)
  })
  it('passes', () => {
    cy.wait(2000)
    cy.get('.text-heading-xlarge').invoke('text').then((text) => {
      const title = text.trim();
      console.log("titulo: ",title)
    })
    cy.get('.text-body-medium').invoke('text').then((text) => {
      const subscription = text.trim();
      console.log("descrição: ", subscription)
    })

    cy.get('body').then((body) => {
      if (body.find('.relative > :nth-child(1) > .text-body-small > [aria-hidden="true"]').length > 0) {
        cy.get('.relative > :nth-child(1) > .text-body-small > [aria-hidden="true"]').invoke('text').then((text) => {
          const talkAbout = text.trim();
          console.log("fala sobre: ", talkAbout)
        })
      }
    })


    cy.get('body').then((body) => {
      if (body.find('.pv-text-details__left-panel.mt2 > .text-body-small').length > 0) {
        cy.get('.pv-text-details__left-panel.mt2 > .text-body-small').invoke('text').then((text) => {
          const city = text.trim();
          console.log("cidade: ", city)
        })
      }
    })



    cy.get('body').then((body) => {
      if (body.find('.pv-top-card--list').length > 0) {
        cy.get('.pv-top-card--list').invoke('text').then((text) => {
          const follows = text.trim().replace(/\s/g, " ");
          console.log("Seguidores: ", follows)
        })
      }
    })

    // cy.get('body').then((body) => {
    //   if (body.find(':nth-child(2) > .t-black--light > .t-bold').length > 0) {
    //     cy.get(':nth-child(2) > .t-black--light > .t-bold').invoke('text').then((text) => {
    //       const conections = text.trim();
    //       console.log("conexões: ", conections)
    //     })
    //   }
    // })


        // [data-generated-suggestion-target="urn:li:fsu_profileActionDelegate:-1839640498"] > .pv-shared-text-with-see-more > .inline-show-more-text > [aria-hidden="true"]
    cy.get('body').then((body) => {
      if (body.find('.pv-shared-text-with-see-more > .inline-show-more-text > [aria-hidden="true"]').length > 0) {
        cy.get('.pv-shared-text-with-see-more > .inline-show-more-text > [aria-hidden="true"]').then((text) => {
          const about = text[0].innerText;
          console.log("Sobre: ", about)
        })
      }
    })

    //
    // cy.get('body').then((body) => {
    //   if (body.find('#navigation-index-see-all-languages').length > 0) {
    //     cy.wait(2000)
    //     cy.get('#navigation-index-see-all-languages').click()
    //   }
    // })

    cy.wait(2000)

    cy.get('body').then((body) => {
      if (body.find('#languages').length > 0) {
        cy.get('#languages').then((text) => {
          const id = text[0].offsetParent.id;
          if (body.find(`#${id}`)) {
            if (cy.get(`#${id}`)) {
              cy.get(`#${id} > :nth-child(3) > :nth-child(1)`).then((value) => {
                console.log("languages: ", value[0].innerText.trim())
              })
            }
          }
        })
      }
    })


    cy.wait(2000)
    cy.visit(profileUrl)

    cy.wait(2000)

    cy.get('body').then((body) => {
      if (body.find('#top-card-text-details-contact-info').length > 0) {
        cy.get('#top-card-text-details-contact-info').click()
        cy.wait(2000)
      }
    })

    console.log("informações de contato")

    // cy.get('.ci-vanity-url > .pv-contact-info__ci-container > .pv-contact-info__contact-link').invoke('text').then((text) => {
    //   const linkedinProfile = text.trim();
    //   console.log("perfil: ", linkedinProfile) 
    // })
    // const cont = 0;
    const array = []

    cy.get('body').then((body) => {
      if (body.find('.ci-vanity-url > .pv-contact-info__ci-container').length > 0) {
        cy.get('.ci-vanity-url > .pv-contact-info__ci-container').then((text) =>{
          const contactInfo = text[0].innerText
          console.log("Informação de contato: ", contactInfo)
        })

      }
    })

    cy.get('body').then((body) => {
      if (body.find('.ci-websites > .list-style-none').length > 0) {
        cy.get('.ci-websites > .list-style-none').each((sites) => {
          if(sites[0].children[0].innerText) {
            array.push(sites[0].children[0].innerText)
          }
        }).then((array) => {
          array.each((element) => {
            console.log("site: ", array[element].innerText)
          })
        });
      }
    })

    cy.visit(profileUrl)
    cy.wait(2000)

    cy.get('body').then((body) => {
      if(body.find('#education').length > 0) {
        if (cy.get('#education')) {
          cy.get('#education').then((text) => {
            const id = text[0].offsetParent.id;
            if (body.find(`#${id}`)) {
              if (cy.get(`#${id}`)) {
                cy.get(`#${id} > :nth-child(3) > :nth-child(1)`).then((value) => {
                  console.log("education: ", value[0].innerText.trim())
                })
              }
            }
          })
        }
      }
    })

    // Aguarde até que a página de feed seja carregada
    // cy.waitUntil(() => cy.url().should('include', '/feed'), { timeout: 10000 });

    // Vá para o perfil do usuário
    cy.visit(profileUrl);

    // Aguarde até que a página do perfil seja carregada
    // cy.waitUntil(() => cy.url().should('include', '/in/'), { timeout: 10000 });

    // Role até o final da página para carregar todas as experiências

    cy.wait(2000)

    // cy.get('body').then((body) => {
    //   if(body.find('#navigation-index-see-all-experiences > .pvs-navigation__text').length > 0) {
    //     cy.get('#navigation-index-see-all-experiences > .pvs-navigation__text').click()
    //   }
    // })

    cy.wait(2000)
    // cy.get('body').then((body) => {
    //   if (body.find('.artdeco-list__item').length > 0) {
    //     if(cy.get('.artdeco-list__item')){
    //       cy.get('.artdeco-list__item').then((text) => {
    //         const experiences = text[0].innerText.trim()
    //         console.log("Experiencias: ", experiences)
    //       })
    //     }
    //   }
    // })

    // const experiences = [];
    // cy.get('body').then((body) => {
    //   if (body.find('li').length > 0) {
    //     if(cy.get('li')){
    //       cy.get('li').then((text) => {
    //         text.each((value) => {
    //           if(text[value].className.includes("pvs-list__paged-list-item artdeco-list__item pvs-list__item--line-separated pvs-list__item--one-column")){
    //             experiences.push(text[value].innerText)
    //           }
    //           console.log("experiencias ", experiences)
    //         })
    //       })
    //     }
    //   }
    // })


    cy.get('body').then((body) => {
      if (body.find('#experience').length > 0) {
        if(cy.get('#experience')){
          cy.get('#experience').then((text) => {
            const id = text[0].offsetParent.id;
            if (body.find(`#${id}`)) {
              if (cy.get(`#${id}`)) {
                cy.get(`#${id} > :nth-child(3) > :nth-child(1)`).then((value) => {
                  console.log("Experience: ", value[0].innerText.trim())
                })
              }
            }
          })
        }
      }
    })


    cy.get('body').then((body) => {
      if (body.find('#skills').length > 0) {
        if(cy.get('#skills')){
          cy.get('#skills').then((text) => {
            const id = text[0].offsetParent.id;
            console.log('id: ', id)
            if (body.find(`#${id}`)) {
              if (cy.get(`#${id}`)) {
                cy.get(`#${id} > :nth-child(3) > :nth-child(1)`).then((value) => {
                  console.log("skills: ", value[0].innerText.trim())

                })
              }
            }
          })
        }
      }
      // if (body.find('#ember233 > :nth-child(3) > :nth-child(1)').length > 0) {
      //   cy.get('#ember233 > :nth-child(3) > :nth-child(1)').then((text) =>{
      //     const competences = text[0].innerText.trim();
      //     console.log("competencias", competences)
      //   })
      // }
    })


    cy.get('body').then((body) => {
      if (body.find('#volunteering_experience').length > 0) {
        if(cy.get('#volunteering_experience')){
          cy.get('#volunteering_experience').then((text) => {
            const id = text[0].offsetParent.id;
            if (body.find(`#${id}`)) {
              if (cy.get(`#${id}`)) {
                cy.get(`#${id} > :nth-child(3) > :nth-child(1)`).then((value) => {
                  console.log("Volunteering experience: ", value[0].innerText.trim())

                })
              }
            }
          })
        }

      }
    })


    cy.get('body').then((body) => {
      if (body.find('#licenses_and_certifications').length > 0) {
        if(cy.get('#licenses_and_certifications')){
          cy.get('#licenses_and_certifications').then((text) => {
            const id = text[0].offsetParent.id;
            if (body.find(`#${id}`)) {
              if (cy.get(`#${id}`)) {
                cy.get(`#${id} > :nth-child(3) > :nth-child(1)`).then((value) => {
                  console.log("licenses and certifications: ", value[0].innerText.trim())

                })
              }
            }
          })
        }
      }
      // if (body.find('#ember152 > :nth-child(3) > :nth-child(1)').length > 0) {
      //   cy.get('#ember152 > :nth-child(3) > :nth-child(1)').then((text) => {
      //     const certificates = text[0].innerText.trim()
      //     console.log("Certificados: ", certificates)
      //   })
      // }
    })


    cy.get('body').then((body) => {
      if (body.find('#projects').length > 0) {
        if(cy.get('#projects')){
          cy.get('#projects').then((text) => {
            const id = text[0].offsetParent.id;
            if (body.find(`#${id}`)) {
              if (cy.get(`#${id}`)) {
                cy.get(`#${id} > :nth-child(3) > :nth-child(1)`).then((value) => {
                  console.log("projects: ", value[0].innerText.trim())

                })
              }
            }
          })
        }
      }
    })


    cy.get('body').then((body) => {
      if (body.find('#publications').length > 0) {
        if(cy.get('#publications')){
          cy.get('#publications').then((text) => {
            const id = text[0].offsetParent.id;
            if (body.find(`#${id}`)) {
              if (cy.get(`#${id}`)) {
                cy.get(`#${id} > :nth-child(3) > :nth-child(1)`).then((value) => {
                  console.log("publications: ", value[0].innerText.trim())

                })
              }
            }
          })
        }
      }
      // if (body.find('#ember162 > :nth-child(3) > :nth-child(1)').length > 0) {
      //   cy.get('#ember162 > :nth-child(3) > :nth-child(1)').then((text) => {
      //     const publications = text[0].innerText.trim()
      //     console.log("Publicações: ", publications)
      //   })
      // }
    })


    cy.get('body').then((body) => {
      if (body.find('#courses').length > 0) {
        if(cy.get('#courses')){
          cy.get('#courses').then((text) => {
            const id = text[0].offsetParent.id;
            if (body.find(`#${id}`)) {
              if (cy.get(`#${id}`)) {
                cy.get(`#${id} > :nth-child(3) > :nth-child(1)`).then((value) => {
                  console.log("courses: ", value[0].innerText.trim())

                })
              }
            }
          })
        }
      }
      // if (body.find('#ember163 > .pvs-list__outer-container > .pvs-list > :nth-child(1) > .pvs-entity').length > 0) {
      //   cy.get('#ember163 > .pvs-list__outer-container > .pvs-list > :nth-child(1) > .pvs-entity').then((text) => {
      //     const courses = text[0].innerText.trim()
      //     console.log("Cursos: ", courses)
      //   })
      // }
    })


    cy.get('body').then((body) => {
      if (body.find('#honors_and_awards').length > 0) {
        if(cy.get('#honors_and_awards')){
          cy.get('#honors_and_awards').then((text) => {
            const id = text[0].offsetParent.id;
            if (body.find(`#${id}`)) {
              if (cy.get(`#${id}`)) {
                cy.get(`#${id} > :nth-child(3) > :nth-child(1)`).then((value) => {
                  console.log("honors and awards: ", value[0].innerText.trim())

                })
              }
            }
          })
        }
      }
      // if (body.find('#ember163 > :nth-child(3) > :nth-child(1)').length > 0) {
      //   cy.get('#ember163 > :nth-child(3) > :nth-child(1)').then((text) => {
      //     const recognizesAndPrizes = text[0].innerText.trim()
      //     console.log("Reconhecimentos e premios: ", recognizesAndPrizes)
      //   })
      // }
    })


    cy.get('body').then((body) => {
      if (body.find('#organizations').length > 0) {
        if(cy.get('#organizations')){
          cy.get('#organizations').then((text) => {
            const id = text[0].offsetParent.id;
            if (body.find(`#${id}`)) {
              if (cy.get(`#${id}`)) {
                cy.get(`#${id} > :nth-child(3) > :nth-child(1)`).then((value) => {
                  console.log("organizations: ", value[0].innerText.trim())

                })
              }
            }
          })
        }
      }
      // if (body.find('#ember167 > :nth-child(3) > :nth-child(1)').length > 0) {
      //   cy.get('#ember167 > :nth-child(3) > :nth-child(1)').then((text) => {
      //     const organizations = text[0].innerText.trim()
      //     console.log("Organizações: ", organizations)
      //   })
      // }
    })


  })
    // console.log("sites: ")
    // cy.get(':nth-child(1) > .pv-contact-info__contact-link').invoke('text').then((text) => {
    //   const linkedinProfile = text.trim();
    //   console.log("perfil: ", linkedinProfile) 
    // })

    // cy.get('.ci-vanity-url > .pv-contact-info__ci-container > .pv-contact-info__contact-link').invoke('text').then((text) => {
    //   const linkedinProfile = text.trim();
    //   console.log("perfil: ", linkedinProfile) 
    // })

    // cy.get('.ci-vanity-url > .pv-contact-info__ci-container > .pv-contact-info__contact-link').invoke('text').then((text) => {
    //   const linkedinProfile = text.trim();
    //   console.log("perfil: ", linkedinProfile) 
    // })

})



// describe('Experiências do LinkedIn', () => {
//   it('Deve obter as experiências do perfil do LinkedIn', () => {
//     // Visite a página de login do LinkedIn
//     cy.visit('https://www.linkedin.com/login');
//
//     // Preencha os campos de e-mail e senha e faça login
//     cy.get('#username').type('lticontasc@gmail.com');
//     cy.get('#password').type('Linkedinlti!');
//     cy.get('.btn__primary--large').click();
//
//     // Aguarde até que a página de feed seja carregada
//     cy.waitUntil(() => cy.url().should('include', '/feed'), { timeout: 10000 });
//
//     // Vá para o perfil do usuário
//     cy.visit(profileUrl);
//
//     // Aguarde até que a página do perfil seja carregada
//     cy.waitUntil(() => cy.url().should('include', '/in/'), { timeout: 10000 });
//
//     // Role até o final da página para carregar todas as experiências
//     cy.scrollTo('bottom');
//
//     // Obtenha todas as seções de experiência do perfil
//     cy.get('.experience-section').should('have.length.gt', 0).then((sections) => {
//       // Itere sobre cada seção de experiência
//       sections.each((index, section) => {
//         // Obtenha o título da experiência
//         const title = Cypress.$(section).find('.experience-section__title').text();
//
//         // Obtenha as datas de início e fim da experiência
//         const dates = Cypress.$(section).find('.date-range__duration').text();
//
//         // Obtenha a descrição da experiência
//         const description = Cypress.$(section).find('.experience-section__description').text();
//
//         // Imprima as informações da experiência no console
//         cy.log(`Experiência ${index + 1}`);
//         cy.log(`Título: ${title}`);
//         cy.log(`Datas: ${dates}`);
//         cy.log(`Descrição: ${description}`);
//       });
//     });
//   });
// });


