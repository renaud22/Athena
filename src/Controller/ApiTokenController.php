<?php

namespace App\Controller;

use App\Entity\ApiToken;
use App\Form\ApiTokenType;
use App\Repository\ApiTokenRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

#[Route('/admin/tokens')]
#[IsGranted('ROLE_USER')]
class ApiTokenController extends AbstractController
{
    #[Route('/', name: 'app_api_token_index', methods: ['GET', 'POST'])]
    public function index(Request $request, ApiTokenRepository $apiTokenRepository, EntityManagerInterface $entityManager): Response
    {
        $apiToken = new ApiToken();
        $form = $this->createForm(ApiTokenType::class, $apiToken);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $apiToken->setOwner($this->getUser());
            $entityManager->persist($apiToken);
            $entityManager->flush();

            $this->addFlash('success', 'Token API créé avec succès !');

            return $this->redirectToRoute('app_api_token_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('api_token/index.html.twig', [
            'api_tokens' => $apiTokenRepository->findBy(['owner' => $this->getUser()]),
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_api_token_delete', methods: ['POST'])]
    public function delete(Request $request, ApiToken $apiToken, EntityManagerInterface $entityManager): Response
    {
        if ($apiToken->getOwner() !== $this->getUser()) {
            throw $this->createAccessDeniedException();
        }

        if ($this->isCsrfTokenValid('delete'.$apiToken->getId(), $request->request->get('_token'))) {
            $entityManager->remove($apiToken);
            $entityManager->flush();
            $this->addFlash('success', 'Token supprimé.');
        }

        return $this->redirectToRoute('app_api_token_index', [], Response::HTTP_SEE_OTHER);
    }
}
