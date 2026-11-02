
/* =========================================
   MOTION DESIGN — ARISTIDES MANUEL
========================================= */

document.documentElement.classList.add("js-motion");

// Elementos que serão animados ao entrar no ecrã
const elementosAnimados = document.querySelectorAll(`
    .sobre-caixa .section-label,
    .sobre-conteudo,
    .secao-servicos .section-label,
    .servico-card,
    .meus_projetos .section-label,
    .meus_projetos-motion .section-label,
    .projeto-card,
    .secao-processo .section-label,
    .processo-item,
    .secao-ferramentas .section-label,
    .ferramentas-lista span,
    .nota-ferramentas,
    .caixa-contato-principal .section-label,
    .titulo-contato,
    .caixa-contato,
    .whatsapp-link,
    .footer-cta,
    .footer-services,
    .footer-links,
    .footer-bottom
`);

// Criar atrasos sequenciais para os elementos
// que pertencem ao mesmo grupo
const grupos = new Map();

elementosAnimados.forEach((elemento) => {
    const grupo = elemento.parentElement;

    const posicao = grupos.get(grupo) || 0;

    elemento.style.setProperty(
        "--motion-delay",
        `${(posicao % 5) * 100}ms`
    );

    grupos.set(grupo, posicao + 1);

    elemento.classList.add("motion-reveal");
});

// Observar a entrada dos elementos no ecrã
if ("IntersectionObserver" in window) {

    const observador = new IntersectionObserver(
        (entradas, observer) => {

            entradas.forEach((entrada) => {

                if (entrada.isIntersecting) {
                    entrada.target.classList.add("is-visible");

                    observer.unobserve(entrada.target);
                }

            });

        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -40px 0px"
        }
    );

    elementosAnimados.forEach((elemento) => {
        observador.observe(elemento);
    });

} else {

    // Alternativa para navegadores sem suporte
    elementosAnimados.forEach((elemento) => {
        elemento.classList.add("is-visible");
    });

}
