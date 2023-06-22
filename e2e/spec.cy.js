const { timeout } = require("async")
const { elementAt } = require("rxjs")

const profiles = ['https://www.linkedin.com/in/micheleprofmatematica/', 'https://www.linkedin.com/in/dhiogo-bandeira-nobrega-660951192/']
// https://www.linkedin.com/in/micheleprofmatematica/
// https://www.linkedin.com/in/dhiogo-bandeira-nobrega-660951192/
const profileUrl = profiles[0]
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


    cy.get('body').then((body) => {
      if (body.find('#navigation-index-see-all-languages').length > 0) {
        cy.wait(2000)
        cy.get('#navigation-index-see-all-languages').click()
      }
    })

    cy.wait(2000)

    cy.get('body').then((body) => {
      if (body.find('.pvs-list__paged-list-item').length > 0) {
        cy.get('.pvs-list__paged-list-item').each((lenguages) => {
          console.log(lenguages[0].children[0].innerText)
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
          console.log(sites)
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
      if (body.find('#ember134 > :nth-child(3) > :nth-child(1)').length > 0) {
        cy.get('#ember134 > :nth-child(3) > :nth-child(1)').then((text) => {
          const academicsFormations = text[0].innerText.trim();
          console.log("formações academicas", academicsFormations)
        })
      }
    })


    cy.get('body').then((body) => {
      if (body.find('.artdeco-list__item').length > 0) {
        if(cy.get('.artdeco-list__item')){
          cy.get('.artdeco-list__item').then((text) => {
            const experiences = text[0].innerText.trim()
            console.log("Experiencias: ", experiences)
          })
        }
      }
    })


    cy.get('body').then((body) => {
      if (body.find('#ember233 > :nth-child(3) > :nth-child(1)').length > 0) {
        cy.get('#ember233 > :nth-child(3) > :nth-child(1)').then((text) =>{
          const competences = text[0].innerText.trim();
          console.log("competencias", competences)
        })
      }
    })


    cy.get('body').then((body) => {
      if (body.find('#ember149 > :nth-child(3) > :nth-child(1)').length > 0) {
        cy.get('#ember149 > :nth-child(3) > :nth-child(1)').then((text) => {
          const volunteerWork = text[0].innerText.trim();
          console.log("Trabalhos voluntários: ", volunteerWork)
        })
      }
    })


    cy.get('body').then((body) => {
      if (body.find('#ember152 > :nth-child(3) > :nth-child(1)').length > 0) {
        cy.get('#ember152 > :nth-child(3) > :nth-child(1)').then((text) => {
          const certificates = text[0].innerText.trim()
          console.log("Certificados: ", certificates)
        })
      }
    })


    cy.get('body').then((body) => {
      if (body.find('#ember156 > :nth-child(3) > :nth-child(1)').length > 0) {
        cy.get('#ember156 > :nth-child(3) > :nth-child(1)').then((text) => {
          const projects = text[0].innerText.trim()
          console.log("Projetos: ", projects)
        })
      }
    })


    cy.get('body').then((body) => {
      if (body.find('#ember162 > :nth-child(3) > :nth-child(1)').length > 0) {
        cy.get('#ember162 > :nth-child(3) > :nth-child(1)').then((text) => {
          const publications = text[0].innerText.trim()
          console.log("Publicações: ", publications)
        })
      }
    })


    cy.get('body').then((body) => {
      if (body.find('#ember163 > .pvs-list__outer-container > .pvs-list > :nth-child(1) > .pvs-entity').length > 0) {
        cy.get('#ember163 > .pvs-list__outer-container > .pvs-list > :nth-child(1) > .pvs-entity').then((text) => {
          const courses = text[0].innerText.trim()
          console.log("Cursos: ", courses)
        })
      }
    })


    cy.get('body').then((body) => {
      if (body.find('#ember163 > :nth-child(3) > :nth-child(1)').length > 0) {
        cy.get('#ember163 > :nth-child(3) > :nth-child(1)').then((text) => {
          const recognizesAndPrizes = text[0].innerText.trim()
          console.log("Reconhecimentos e premios: ", recognizesAndPrizes)
        })
      }
    })


    cy.get('body').then((body) => {
      if (body.find('#ember167 > :nth-child(3) > :nth-child(1)').length > 0) {
        cy.get('#ember167 > :nth-child(3) > :nth-child(1)').then((text) => {
          const organizations = text[0].innerText.trim()
          console.log("Organizações: ", organizations)
        })
      }
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






