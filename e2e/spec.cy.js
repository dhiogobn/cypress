const { timeout } = require("async")

describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://www.linkedin.com/authwall?trk=qf&original_referer=https://www.linkedin.com/in/micheleprofmatematica/?originalSubdomain=br&sessionRedirect=https%3A%2F%2Fwww.linkedin.com%2F', {
    failOnStatusCode: false
    })
    cy.get('.authwall-join-form__form-toggle--bottom').click()
    cy.wait(2000)
    cy.get('#session_key').type('lticontasc@gmail.com')
    cy.get('#session_password').type('Linkedinlti!')
    cy.get('.justify-between > .btn-md').click()
    cy.wait(10000)
    cy.visit('https://www.linkedin.com/in/micheleprofmatematica/')  
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

    // cy.get('#top-card-text-details-contact-info').click()
    // console.log("informações de contato")

    // cy.get('.ci-vanity-url > .pv-contact-info__ci-container > .pv-contact-info__contact-link').invoke('text').then((text) => {
    //   const linkedinProfile = text.trim();
    //   console.log("perfil: ", linkedinProfile) 
    // })
    // const cont = 0;
    // const array = []
    // cy.get('.pv-contact-info__ci-container').each((sites) => {
    //   if(sites[0].children[0].innerText) {
    //     array.push(sites[0].children[0].innerText)
    //   }
    // });
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






