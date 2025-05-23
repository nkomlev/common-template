import { verifyJwtToken } from "@common-templates/shared/lib/verifyToken";
import { NextResponse } from "next/server";

// Функция middlewareAuthRoutesHandler проверяет корректность токена авторизации и устанавливает необходиые данные в cookie,
// либо перенаправляет пользователя на страницу авторизации при некорректном и отсутсвующем токене
export const middlewareAuthRoutesHandler = async (request, response) => {
  const token = request.cookies.get("token");
  const currentClient = token && (await verifyJwtToken(token.value));

  if (!currentClient) {
    response = NextResponse.redirect(new URL(`/authorization`, request.url));
    response.cookies.delete("token");
  }
  return response;
}

export const middlewareLogoutHandler = async (request, response) => {
  response = NextResponse.redirect(new URL(`/authorization`, request.url));
  response.cookies.delete("token");
  response.cookies.delete("customerId");
  return response
}