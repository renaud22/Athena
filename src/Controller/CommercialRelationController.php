<?php

namespace App\Controller;

use App\Entity\CommercialRelation;
use App\Form\CommercialRelationType;
use App\Repository\CommercialRelationRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/commercial-relations')]
final class CommercialRelationController extends AbstractController
{
    #[Route('/', name: 'app_commercial_relation_index', methods: ['GET'])]
    public function index(CommercialRelationRepository $commercialRelationRepository): Response
    {
        return $this->render('commercial_relation/index.html.twig', [
            'commercial_relations' => $commercialRelationRepository->findAll(),
        ]);
    }

    #[Route('/new', name: 'app_commercial_relation_new', methods: ['GET', 'POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): Response
    {
        $commercialRelation = new CommercialRelation();
        $commercialRelation->addContact(new \App\Entity\Contact());
        $form = $this->createForm(CommercialRelationType::class, $commercialRelation);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->persist($commercialRelation);
            $entityManager->flush();

            return $this->redirectToRoute('app_commercial_relation_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('commercial_relation/new.html.twig', [
            'commercial_relation' => $commercialRelation,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_commercial_relation_show', methods: ['GET'], requirements: ['id' => '\d+'])]
    public function show(CommercialRelation $commercialRelation): Response
    {
        return $this->render('commercial_relation/show.html.twig', [
            'commercial_relation' => $commercialRelation,
        ]);
    }

    #[Route('/{id}/edit', name: 'app_commercial_relation_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, CommercialRelation $commercialRelation, EntityManagerInterface $entityManager): Response
    {
        $form = $this->createForm(CommercialRelationType::class, $commercialRelation);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->flush();

            return $this->redirectToRoute('app_commercial_relation_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('commercial_relation/edit.html.twig', [
            'commercial_relation' => $commercialRelation,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_commercial_relation_delete', methods: ['POST'])]
    public function delete(Request $request, CommercialRelation $commercialRelation, EntityManagerInterface $entityManager): Response
    {
        if ($this->isCsrfTokenValid('delete'.$commercialRelation->getId(), $request->getPayload()->getString('_token'))) {
            $entityManager->remove($commercialRelation);
            $entityManager->flush();
        }

        return $this->redirectToRoute('app_commercial_relation_index', [], Response::HTTP_SEE_OTHER);
    }
}
