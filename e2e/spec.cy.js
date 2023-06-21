const { timeout } = require("async")
const { before } = require("mocha")
const { elementAt } = require("rxjs")
const profileUrl = 'https://www.linkedin.com/in/micheleprofmatematica/'
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

    cy.get('.relative > :nth-child(1) > .text-body-small > [aria-hidden="true"]').invoke('text').then((text) => {
      const talkAbout = text.trim();
      console.log("fala sobre: ", talkAbout) 
    })

    cy.get('.pv-text-details__left-panel.mt2 > .text-body-small').invoke('text').then((text) => {
      const city = text.trim();
      console.log("cidade: ", city) 
    })

    cy.get('.inline-block > .t-bold').invoke('text').then((text) => {
      const follows = text.trim();
      console.log("Seguidores: ", follows) 
    })
    cy.get(':nth-child(2) > .t-black--light > .t-bold').invoke('text').then((text) => {
      const conections = text.trim();
      console.log("conexões: ", conections) 
    })

    cy.get('[data-generated-suggestion-target="urn:li:fsu_profileActionDelegate:-1839640498"] > .pv-shared-text-with-see-more > .inline-show-more-text > [aria-hidden="true"]')
    .invoke('text').then((text) => {
      const about = text.trim();
      console.log("Sobre: ", about) 
    })

    cy.wait(2000)
    cy.get('#navigation-index-see-all-languages').click()
    cy.wait(2000)
    cy.get('.pvs-list__paged-list-item').each((lenguages) => {
      console.log(lenguages[0].children[0].innerText)
    })

    cy.wait(2000)
    cy.visit(profileUrl)  

    cy.wait(2000)

    cy.get('#top-card-text-details-contact-info').click()
    console.log("informações de contato")

    // cy.get('.ci-vanity-url > .pv-contact-info__ci-container > .pv-contact-info__contact-link').invoke('text').then((text) => {
    //   const linkedinProfile = text.trim();
    //   console.log("perfil: ", linkedinProfile) 
    // })
    // const cont = 0;
    const array = []
    cy.get('.pv-contact-info__ci-container').each((sites) => {
      if(sites[0].children[0].innerText) {
        array.push(sites[0].children[0].innerText)
      }
    }).then((array) => {
      array.each((element) => {
        console.log("site: ", array[element].innerText)
      })
    });

    cy.visit(profileUrl)  
    cy.wait(2000)

    cy.get('#ember134 > :nth-child(3) > :nth-child(1)').then((text) => {
      const academicsFormations = text[0].innerText.trim();
      console.log("formações academicas", academicsFormations)
    })

    cy.get('#ember114 > :nth-child(3) > :nth-child(1)').then((text) => {
      const experiences = text[0].innerText.trim()
      console.log("Experiencias: ", experiences)
    })

    cy.get('#ember233 > :nth-child(3) > :nth-child(1)').then((text) =>{
      const competences = text[0].innerText.trim();
      console.log("competencias", competences)
    })

    cy.get('#ember149 > :nth-child(3) > :nth-child(1)').then((text) => {
      const volunteerWork = text[0].innerText.trim();
      console.log("Trabalhos voluntários: ", volunteerWork)
    })

    cy.get('#ember152 > :nth-child(3) > :nth-child(1)').then((text) => {
      const certificates = text[0].innerText.trim()
      console.log("Certificados: ", certificates)
    })

    cy.get('#ember156 > :nth-child(3) > :nth-child(1)').then((text) => {
      const projects = text[0].innerText.trim()
      console.log("Projetos: ", projects)
    })

    cy.get('#ember162 > :nth-child(3) > :nth-child(1)').then((text) => {
      const publications = text[0].innerText.trim()
      console.log("Publicações: ", publications)
    })

    cy.get('#ember163 > .pvs-list__outer-container > .pvs-list > :nth-child(1) > .pvs-entity').then((text) => {
      const courses = text[0].innerText.trim()
      console.log("Cursos: ", courses)
    })

    cy.get('#ember163 > :nth-child(3) > :nth-child(1)').then((text) => {
      const recognizesAndPrizes = text[0].innerText.trim()
      console.log("Reconhecimentos e premios: ", recognizesAndPrizes)
    })

    cy.get('#ember167 > :nth-child(3) > :nth-child(1)').then((text) => {
      const organizations = text[0].innerText.trim()
      console.log("Organizações: ", organizations)
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






